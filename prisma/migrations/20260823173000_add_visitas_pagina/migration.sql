-- CreateTable
CREATE TABLE `visitas_pagina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ruta` VARCHAR(191) NOT NULL,
    `referer` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `visitas_pagina_created_at_idx`(`created_at`),
    INDEX `visitas_pagina_ruta_idx`(`ruta`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
