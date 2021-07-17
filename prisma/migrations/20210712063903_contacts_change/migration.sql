-- AlterTable
ALTER TABLE `msgs` ADD COLUMN `date` VARCHAR(100),
    ADD COLUMN `day` VARCHAR(100),
    ADD COLUMN `month` VARCHAR(100),
    ADD COLUMN `time` VARCHAR(500),
    ADD COLUMN `year` VARCHAR(500);

-- AlterTable
ALTER TABLE `visiter` ADD COLUMN `month` VARCHAR(100);
