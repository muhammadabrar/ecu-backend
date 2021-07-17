-- CreateTable
CREATE TABLE `earn` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `earn` INTEGER,
    `title` VARCHAR(500),
    `month` INTEGER,
    `day` INTEGER,
    `date` INTEGER,
    `year` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `soldfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_id` INTEGER NOT NULL,
    `buyer` VARCHAR(500),
    `amount` INTEGER,
    `month` INTEGER,
    `day` INTEGER,
    `date` INTEGER,
    `year` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(500),
    `des` VARCHAR(500),
    `email` VARCHAR(100),
    `file1` VARCHAR(100),
    `file2` VARCHAR(100),
    `status` BOOLEAN DEFAULT false,
    `month` INTEGER,
    `day` INTEGER,
    `date` INTEGER,
    `year` INTEGER,
    `time` VARCHAR(500),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `soldfile` ADD FOREIGN KEY (`file_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
