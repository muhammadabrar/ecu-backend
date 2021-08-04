-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `make` VARCHAR(50) NOT NULL,
    `model` VARCHAR(50),
    `engine` VARCHAR(50),
    `power` VARCHAR(50),
    `hw` VARCHAR(50),
    `sw` VARCHAR(50),
    `ecu` VARCHAR(50),
    `price` INTEGER,
    `size` VARCHAR(50),
    `file` VARCHAR(200),
    `Tool_read` VARCHAR(50),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `model` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `model.model_unique`(`model`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `make` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `make` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `make.make_unique`(`make`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `engine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `engine` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `engine.engine_unique`(`engine`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(45),
    `pass` VARCHAR(200),
    `token` VARCHAR(200),
    `status` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User.email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `msgs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45),
    `email` VARCHAR(100),
    `subject` VARCHAR(100),
    `msg` VARCHAR(500),
    `month` INTEGER,
    `day` INTEGER,
    `date` INTEGER,
    `year` INTEGER,
    `time` VARCHAR(500),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visiter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ip` VARCHAR(191) NOT NULL,
    `month` INTEGER,
    `day` INTEGER,
    `date` INTEGER,
    `year` INTEGER,

    UNIQUE INDEX `visiter.ip_unique`(`ip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `cat` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cat.cat_unique`(`cat`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `about` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100),
    `image` VARCHAR(500),
    `p` VARCHAR(500),
    `p2` VARCHAR(500),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faq` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Q` VARCHAR(100),
    `p` VARCHAR(500),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `feedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100),
    `company` VARCHAR(500),
    `feedback` VARCHAR(500),
    `stars` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `download` BOOLEAN NOT NULL DEFAULT false,
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
    `price` INTEGER,
    `status` BOOLEAN DEFAULT false,
    `paid` BOOLEAN DEFAULT false,
    `month` INTEGER,
    `day` INTEGER,
    `date` INTEGER,
    `year` INTEGER,
    `time` VARCHAR(500),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ordersID` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tuningfile_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tuningfiles` ADD FOREIGN KEY (`cat_id`) REFERENCES `cat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `soldfile` ADD FOREIGN KEY (`file_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordersID` ADD FOREIGN KEY (`tuningfile_id`) REFERENCES `tuningfiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordersID` ADD FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
