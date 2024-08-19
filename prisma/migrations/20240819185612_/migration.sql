/*
  Warnings:

  - You are about to drop the column `discontPrice` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercentage` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - Added the required column `price` to the `product_skus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_skus" ADD COLUMN     "discontPrice" DOUBLE PRECISION,
ADD COLUMN     "discountPercentage" DOUBLE PRECISION,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "discontPrice",
DROP COLUMN "discountPercentage",
DROP COLUMN "price",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "longDescription" TEXT,
ALTER COLUMN "newProduct" DROP NOT NULL;
