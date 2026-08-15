-- CreateTable
CREATE TABLE `usuarios_admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL DEFAULT 'editor',
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `ultimo_login` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuarios_admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `especialidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `especialidades_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `foto_url` VARCHAR(191) NULL,
    `biografia_corta` VARCHAR(500) NULL,
    `biografia_larga` TEXT NULL,
    `cedula_profesional` VARCHAR(191) NULL,
    `anios_experiencia` INTEGER NULL,
    `orden_display` INTEGER NOT NULL DEFAULT 0,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doctores_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor_especialidad` (
    `doctor_id` INTEGER NOT NULL,
    `especialidad_id` INTEGER NOT NULL,

    PRIMARY KEY (`doctor_id`, `especialidad_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `redes_sociales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctor_id` INTEGER NULL,
    `plataforma` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `orden` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimonios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctor_id` INTEGER NULL,
    `nombre_paciente` VARCHAR(191) NOT NULL,
    `calificacion` INTEGER NOT NULL,
    `comentario` TEXT NOT NULL,
    `video_url` VARCHAR(191) NULL,
    `foto_url` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'pendiente',
    `origen` VARCHAR(191) NOT NULL DEFAULT 'formulario_publico',
    `aprobado_por` INTEGER NULL,
    `aprobado_en` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `casos_exito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctor_id` INTEGER NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `tratamiento` VARCHAR(191) NULL,
    `descripcion` TEXT NULL,
    `foto_antes_url` VARCHAR(191) NOT NULL,
    `foto_despues_url` VARCHAR(191) NOT NULL,
    `publicado` BOOLEAN NOT NULL DEFAULT false,
    `orden_display` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `galeria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NULL,
    `orden_display` INTEGER NOT NULL DEFAULT 0,
    `publicado` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contactos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `mensaje` TEXT NULL,
    `doctor_interes_id` INTEGER NULL,
    `medio_contacto` VARCHAR(191) NOT NULL DEFAULT 'formulario_web',
    `estado` VARCHAR(191) NOT NULL DEFAULT 'nuevo',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configuracion_sitio` (
    `clave` VARCHAR(191) NOT NULL,
    `valor` TEXT NOT NULL,

    PRIMARY KEY (`clave`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos_paquetes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `doctor_id` INTEGER NULL,
    `categoria` VARCHAR(191) NULL,
    `imagen_url` VARCHAR(191) NULL,
    `destacado` BOOLEAN NOT NULL DEFAULT false,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `orden_display` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `productos_paquetes_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promociones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NULL,
    `imagen_url` VARCHAR(191) NOT NULL,
    `enlace_externo` VARCHAR(191) NULL,
    `producto_paquete_id` INTEGER NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `orden_display` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `doctor_especialidad` ADD CONSTRAINT `doctor_especialidad_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_especialidad` ADD CONSTRAINT `doctor_especialidad_especialidad_id_fkey` FOREIGN KEY (`especialidad_id`) REFERENCES `especialidades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `redes_sociales` ADD CONSTRAINT `redes_sociales_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testimonios` ADD CONSTRAINT `testimonios_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testimonios` ADD CONSTRAINT `testimonios_aprobado_por_fkey` FOREIGN KEY (`aprobado_por`) REFERENCES `usuarios_admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `casos_exito` ADD CONSTRAINT `casos_exito_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contactos` ADD CONSTRAINT `contactos_doctor_interes_id_fkey` FOREIGN KEY (`doctor_interes_id`) REFERENCES `doctores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productos_paquetes` ADD CONSTRAINT `productos_paquetes_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promociones` ADD CONSTRAINT `promociones_producto_paquete_id_fkey` FOREIGN KEY (`producto_paquete_id`) REFERENCES `productos_paquetes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
