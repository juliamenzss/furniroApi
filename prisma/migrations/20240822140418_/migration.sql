/*
  Warnings:

  - You are about to drop the column `discontPrice` on the `product_skus` table. All the data in the column will be lost.
  - You are about to drop the column `newProduct` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itemCart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "itemCart" DROP CONSTRAINT "itemCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "itemCart" DROP CONSTRAINT "itemCart_productSkuId_fkey";

-- AlterTable
ALTER TABLE "product_skus" DROP COLUMN "discontPrice",
ADD COLUMN     "discountPrice" DOUBLE PRECISION,
ADD COLUMN     "imageSku" TEXT,
ADD COLUMN     "newProduct" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "newProduct";

-- DropTable
DROP TABLE "cart";

-- DropTable
DROP TABLE "itemCart";
