/*
  Warnings:

  - A unique constraint covering the columns `[ip]` on the table `visiter` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ip` on table `visiter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `visiter` MODIFY `ip` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `visiter.ip_unique` ON `visiter`(`ip`);
