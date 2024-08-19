/*
  Warnings:

  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `discountNew` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `discountTag` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `departments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "categoryId",
DROP COLUMN "discountNew",
DROP COLUMN "discountTag",
ADD COLUMN     "discountPercentage" DOUBLE PRECISION,
ADD COLUMN     "new" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "departments";
