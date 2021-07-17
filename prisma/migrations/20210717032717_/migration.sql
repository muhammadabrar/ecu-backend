/*
  Warnings:

  - Added the required column `order_id` to the `ordersID` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ordersid` ADD COLUMN `order_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ordersID` ADD FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
