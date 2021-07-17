/*
  Warnings:

  - You are about to alter the column `date` on the `msgs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to alter the column `day` on the `msgs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to alter the column `month` on the `msgs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to alter the column `year` on the `msgs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `Int`.

*/
-- AlterTable
ALTER TABLE `msgs` MODIFY `date` INTEGER,
    MODIFY `day` INTEGER,
    MODIFY `month` INTEGER,
    MODIFY `year` INTEGER;
