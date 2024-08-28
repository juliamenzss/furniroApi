/*
  Warnings:

  - You are about to drop the column `productSkuId` on the `order_products` table. All the data in the column will be lost.
  - You are about to alter the column `total` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `productId` to the `order_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_products" DROP CONSTRAINT "order_products_productSkuId_fkey";

-- DropIndex
DROP INDEX "orders_email_key";

-- AlterTable
ALTER TABLE "order_products" DROP COLUMN "productSkuId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "total" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product_skus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
