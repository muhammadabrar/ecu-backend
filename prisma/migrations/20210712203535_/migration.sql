/*
  Warnings:

  - You are about to alter the column `day` on the `visiter` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to alter the column `date` on the `visiter` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to alter the column `year` on the `visiter` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `Int`.
  - You are about to alter the column `month` on the `visiter` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.

*/
-- AlterTable
ALTER TABLE `visiter` MODIFY `day` INTEGER,
    MODIFY `date` INTEGER,
    MODIFY `year` INTEGER,
    MODIFY `month` INTEGER;
