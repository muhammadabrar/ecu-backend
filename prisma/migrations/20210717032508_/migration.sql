-- CreateTable
CREATE TABLE `ordersID` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tuningfile_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ordersID` ADD FOREIGN KEY (`tuningfile_id`) REFERENCES `tuningfiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
