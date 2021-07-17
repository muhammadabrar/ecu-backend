/*
  Warnings:

  - You are about to drop the column `authorId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `post` table. All the data in the column will be lost.
  - Added the required column `make` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_ibfk_1`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `authorId`,
    DROP COLUMN `content`,
    DROP COLUMN `published`,
    DROP COLUMN `title`,
    ADD COLUMN `Tool_read` VARCHAR(50),
    ADD COLUMN `ecu` VARCHAR(50),
    ADD COLUMN `engine` VARCHAR(50),
    ADD COLUMN `file` VARCHAR(200),
    ADD COLUMN `hw` VARCHAR(50),
    ADD COLUMN `make` VARCHAR(50) NOT NULL,
    ADD COLUMN `model` VARCHAR(50),
    ADD COLUMN `power` VARCHAR(50),
    ADD COLUMN `price` INTEGER,
    ADD COLUMN `size` VARCHAR(50),
    ADD COLUMN `sw` VARCHAR(50);

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
CREATE TABLE `msgs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45),
    `email` VARCHAR(100),
    `subject` VARCHAR(100),
    `msg` VARCHAR(500),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visiter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ip` VARCHAR(45),
    `day` VARCHAR(100),
    `date` VARCHAR(100),
    `year` VARCHAR(500),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
