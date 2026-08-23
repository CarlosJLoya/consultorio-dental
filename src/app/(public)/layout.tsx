import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { VisitTracker } from "@/components/layout/VisitTracker";

export const revalidate = 60;

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <VisitTracker />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
