/*
  Warnings:

  - You are about to drop the column `new` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "new",
ADD COLUMN     "newProduct" BOOLEAN NOT NULL DEFAULT false;
