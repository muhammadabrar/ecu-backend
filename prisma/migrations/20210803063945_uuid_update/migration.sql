/*
  Warnings:

  - The primary key for the `cat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ordersid` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tuningfiles` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `ordersid` DROP FOREIGN KEY `ordersid_ibfk_2`;

-- DropForeignKey
ALTER TABLE `ordersid` DROP FOREIGN KEY `ordersid_ibfk_1`;

-- DropForeignKey
ALTER TABLE `soldfile` DROP FOREIGN KEY `soldfile_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tuningfiles` DROP FOREIGN KEY `tuningfiles_ibfk_1`;

-- AlterTable
ALTER TABLE `cat` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `orders` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ordersid` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `tuningfile_id` VARCHAR(191) NOT NULL,
    MODIFY `order_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `post` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `soldfile` MODIFY `file_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tuningfiles` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `cat_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `tuningfiles` ADD FOREIGN KEY (`cat_id`) REFERENCES `cat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `soldfile` ADD FOREIGN KEY (`file_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordersID` ADD FOREIGN KEY (`tuningfile_id`) REFERENCES `tuningfiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordersID` ADD FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
