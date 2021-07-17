/*
  Warnings:

  - You are about to drop the column `cat_id` on the `tuningfiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cat]` on the table `cat` will be added. If there are existing duplicate values, this will fail.
  - Made the column `cat` on table `cat` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `tuningfiles` DROP FOREIGN KEY `tuningfiles_ibfk_1`;

-- AlterTable
ALTER TABLE `cat` MODIFY `cat` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tuningfiles` DROP COLUMN `cat_id`,
    ADD COLUMN `cat` VARCHAR(45);

-- CreateIndex
CREATE UNIQUE INDEX `cat.cat_unique` ON `cat`(`cat`);
