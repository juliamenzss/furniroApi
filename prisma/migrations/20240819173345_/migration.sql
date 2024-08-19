/*
  Warnings:

  - Added the required column `quantity` to the `product_skus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_skus" ADD COLUMN     "quantity" INTEGER NOT NULL;
