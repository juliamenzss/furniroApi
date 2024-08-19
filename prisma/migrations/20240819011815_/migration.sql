/*
  Warnings:

  - You are about to drop the `_ProductSkuToSize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sizeId` to the `product_skus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductSkuToSize" DROP CONSTRAINT "_ProductSkuToSize_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductSkuToSize" DROP CONSTRAINT "_ProductSkuToSize_B_fkey";

-- AlterTable
ALTER TABLE "product_skus" ADD COLUMN     "sizeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ProductSkuToSize";

-- AddForeignKey
ALTER TABLE "product_skus" ADD CONSTRAINT "product_skus_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
