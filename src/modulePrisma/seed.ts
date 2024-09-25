import { PrismaClient } from '@prisma/client';
import { generateSKU } from '../../generateSKU';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

function createSkuData(name: string, colorId: string, sizeId: string, price: number, discountPrice: number | null, discountPercentage: number | null, newProduct: boolean, quantity: number, imageSku: string, uniqueId: string) {
  return {
    sku: generateSKU(name, colorId, sizeId, uniqueId),
    color: { connect: { id: colorId } }, 
    size: { connect: { id: sizeId } },   
    price,
    newProduct,
    discountPrice,
    discountPercentage,
    quantity,
    imageSku,
  };
}

async function main() {
  const offwhiteColor = await prisma.color.create({ data: { name: 'offWhite' } });
  const caramelColor = await prisma.color.create({ data: { name: 'Caramel' } });
  const blueColor = await prisma.color.create({ data: { name: 'Blue' } });
  const blackColor = await prisma.color.create({ data: { name: 'Black' } });

  const oneSize = await prisma.size.create({ data: { name: 'OS' } });
  const extraSmallSize = await prisma.size.create({ data: { name: 'XS' } });
  const largeSize = await prisma.size.create({ data: { name: 'L' } });
  const extraLargeSize = await prisma.size.create({ data: { name: 'XL' } });

  const products = [
        {
               name: 'Louises Table',
               description: 'Louises table',
              longDescription: 'Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.',
               image: 'https://furniro.s3.amazonaws.com/respiraTable.png',
               productSkus: {
                 create: [
                   createSkuData('Louises Table', caramelColor.id, oneSize.id, 3500.000, 2500.000, 30, false, 2, null, uuidv4()),
                   createSkuData('ResLouisespira Table', blackColor.id, oneSize.id, 3500.000, 2500.000, 30, false, 2, null, uuidv4()),
                 ],
               },
             },
             {
               name: 'Carmelita',
               description: 'Stylish cafe chair',
               longDescription: 'Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.',
               image: 'https://furniro.s3.amazonaws.com/leviosaChair.png',
               productSkus: {
                 create: [
                   createSkuData('Carmelita Chair', caramelColor.id, oneSize.id, 2500.000, null, null, true, 5, null, uuidv4()),
                 ],
               },
             },
             {
               name: 'Lolito',
               description: 'Luxury big sofa',
               image: 'https://furniro.s3.amazonaws.com/lolitoSofa.png',
               productSkus: {
                 create: [
                   createSkuData('Lolito Sofa', offwhiteColor.id, oneSize.id, 14000.000, 7000.000, 50, false, 1, null, uuidv4()),
                  ],
                },
              },
              {
                name: 'Asgaard Sofa',
                description: 'Luxury big sofa',
                longDescription: 'Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.',
                image: 'https://furniro.s3.amazonaws.com/asgaardBlueL.png',
                productSkus: {
                  create: [
                    createSkuData('Asgaard sofa', blueColor.id, largeSize.id, 2500, null, null, false, 10, 'https://furniro.s3.amazonaws.com/asgaardBlueL.png', uuidv4()),
                    createSkuData('Asgaard sofa', blueColor.id, extraSmallSize.id, 2500, null, null, false, 10, 'https://furniro.s3.amazonaws.com/asgaardBlueXl.png', uuidv4()),
                    createSkuData('Asgaard sofa', caramelColor.id, largeSize.id, 2500, null, null, false, 10, 'https://furniro.s3.amazonaws.com/asgaardCaramelL.png', uuidv4()),
                    createSkuData('Asgaard sofa', caramelColor.id, extraSmallSize.id, 2500, null, null, false, 10, 'https://furniro.s3.amazonaws.com/asgaardCaramelXs.png', uuidv4()),
                  ],
                },
              },
      ];
  

      for (const product of products) {
        await prisma.product.create({
          data: {
            name: product.name,
            description: product.description,
            longDescription: product.longDescription,
            image: product.image,
            productSkus: product.productSkus,
          },
        });
      }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

