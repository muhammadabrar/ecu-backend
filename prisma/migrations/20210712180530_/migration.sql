-- CreateTable
CREATE TABLE `contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100),
    `facebook` VARCHAR(500),
    `insta` VARCHAR(500),
    `whatsapp` VARCHAR(500),
    `tweeter` VARCHAR(500),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
