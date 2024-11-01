-- CreateTable
CREATE TABLE `tutores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `senha` VARCHAR(60) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `celular` VARCHAR(11) NULL,
    `endereco` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tutores_email_key`(`email`),
    UNIQUE INDEX `tutores_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `veterinarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `senha` VARCHAR(60) NOT NULL,
    `cnpj` VARCHAR(14) NOT NULL,
    `celular` VARCHAR(11) NULL,
    `endereco` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `veterinarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME NOT NULL,
    `tutorId` INTEGER NOT NULL,
    `veterinarioId` INTEGER NOT NULL,
    `petId` INTEGER NOT NULL,
    `status` ENUM('AGUARDANDO', 'ACEITA', 'RECUSADA') NOT NULL DEFAULT 'AGUARDANDO',
    `descricao` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prontuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(255) NOT NULL,
    `exame` VARCHAR(255) NOT NULL,
    `tratamento` VARCHAR(255) NOT NULL,
    `observacoes` VARCHAR(255) NULL,
    `consultaId` INTEGER NOT NULL,
    `veterinarioId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `dataNasc` VARCHAR(191) NOT NULL,
    `tutorId` INTEGER NOT NULL,
    `racaId` INTEGER NOT NULL,
    `foto` VARCHAR(400) NOT NULL,
    `idade` INTEGER NOT NULL,
    `peso` DOUBLE NOT NULL,
    `sexo` ENUM('MACHO', 'FEMEA') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `racas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `especieId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `especies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `especies_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `consultas` ADD CONSTRAINT `consultas_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `tutores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultas` ADD CONSTRAINT `consultas_veterinarioId_fkey` FOREIGN KEY (`veterinarioId`) REFERENCES `veterinarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultas` ADD CONSTRAINT `consultas_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `pets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prontuarios` ADD CONSTRAINT `prontuarios_consultaId_fkey` FOREIGN KEY (`consultaId`) REFERENCES `consultas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prontuarios` ADD CONSTRAINT `prontuarios_veterinarioId_fkey` FOREIGN KEY (`veterinarioId`) REFERENCES `veterinarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `tutores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_racaId_fkey` FOREIGN KEY (`racaId`) REFERENCES `racas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `racas` ADD CONSTRAINT `racas_especieId_fkey` FOREIGN KEY (`especieId`) REFERENCES `especies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
