import { PrismaClient } from '@prisma/client';
import { generateSKU } from './../generateSKU'; // Ajuste o caminho conforme necessário

const prisma = new PrismaClient();

async function main() {
  const blackColor = await prisma.color.create({ data: { name: 'Black' } });
  const whiteColor = await prisma.color.create({ data: { name: 'White' } });
  const grayColor = await prisma.color.create({ data: { name: 'Gray' } });

  const sizeSmall = await prisma.size.create({ data: { name: 'Small' } });
  const sizeMedium = await prisma.size.create({ data: { name: 'Medium' } });
  const sizeLarge = await prisma.size.create({ data: { name: 'Large' } });

  function createSkuData(name: string, color: string, size: string, colorId: string, sizeId: string, price: number, quantity: number, uniqueId: string) {
    return {
        sku: generateSKU(name, color, size, uniqueId),
        colorId,
        sizeId,
        price,
        quantity,
    };
}

  const asgaardSofa = await prisma.product.create({
    data: {
      name: 'Asgaard Sofa',
      description: 'Asgaard Sofa',
      longDescription: 'Asgaard Sofa',
      image: '',
      productSkus: {
        create: [
          createSkuData('Asgaard Sofa', 'Black', 'S', blackColor.id, sizeSmall.id, 250000, 10, '001'),
          createSkuData('Asgaard Sofa', 'White', 'M', whiteColor.id, sizeMedium.id, 270000, 15, '002'),
          createSkuData('Asgaard Sofa', 'Gray', 'L', grayColor.id, sizeLarge.id, 290000, 5, '003'),
        ],
      },
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  