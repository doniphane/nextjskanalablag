-- CreateTable
CREATE TABLE `BlaguePerso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text_head` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `text_hidden` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
