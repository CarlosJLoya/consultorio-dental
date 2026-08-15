import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

// Config "edge-safe": sin proveedores ni Prisma, para usarse en middleware.
// La configuración completa (con Credentials + Prisma) vive en src/auth.ts.
export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = request.nextUrl.pathname === "/admin/login";

      if (isLoginPage) {
        if (isLoggedIn) {
          return NextResponse.redirect(new URL("/admin", request.nextUrl));
        }
        return true;
      }

      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;
