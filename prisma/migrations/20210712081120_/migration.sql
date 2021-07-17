/*
  Warnings:

  - You are about to drop the column `cat` on the `tuningfiles` table. All the data in the column will be lost.
  - Added the required column `cat_id` to the `tuningfiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tuningfiles` DROP COLUMN `cat`,
    ADD COLUMN `cat_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `tuningfiles` ADD FOREIGN KEY (`cat_id`) REFERENCES `cat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
