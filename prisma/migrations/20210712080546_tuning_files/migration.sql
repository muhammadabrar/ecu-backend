-- CreateTable
CREATE TABLE `tuningfiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cat_id` INTEGER NOT NULL,
    `title` VARCHAR(100),
    `price` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cat` VARCHAR(45),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tuningfiles` ADD FOREIGN KEY (`cat_id`) REFERENCES `cat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
