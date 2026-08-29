-- CreateTable
CREATE TABLE `citas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctor_id` INTEGER NOT NULL,
    `fecha` DATE NOT NULL,
    `hora` INTEGER NOT NULL,
    `nombre_paciente` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `notas` TEXT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'pendiente',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `citas_doctor_id_fecha_hora_key`(`doctor_id`, `fecha`, `hora`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `citas` ADD CONSTRAINT `citas_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
