-- CreateTable
CREATE TABLE "sizes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductSkuToSize" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductSkuToSize_AB_unique" ON "_ProductSkuToSize"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductSkuToSize_B_index" ON "_ProductSkuToSize"("B");

-- AddForeignKey
ALTER TABLE "_ProductSkuToSize" ADD CONSTRAINT "_ProductSkuToSize_A_fkey" FOREIGN KEY ("A") REFERENCES "product_skus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductSkuToSize" ADD CONSTRAINT "_ProductSkuToSize_B_fkey" FOREIGN KEY ("B") REFERENCES "sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
