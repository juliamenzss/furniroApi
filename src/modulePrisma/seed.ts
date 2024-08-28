import { PrismaClient } from '@prisma/client';
import { generateSKU } from '../../generateSKU';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

function createSkuData(name: string, colorId: string, color: string, sizeId: string, size: string, price: number, discountPrice: number | null, discountPercentage: number | null, newProduct: boolean, quantity: number, imageSku: string, uniqueId: string) {
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
  const ofwhiteColor = await prisma.color.create({ data: { name: 'ofwhite' } });
  const caramelColor = await prisma.color.create({ data: { name: 'Caramel' } });
  const blueColor = await prisma.color.create({ data: { name: 'Blue' } });
  const blackColor = await prisma.color.create({ data: { name: 'Black' } });

  const oneSize = await prisma.size.create({ data: { name: 'OS' } });
  const extraSmallSize = await prisma.size.create({ data: { name: 'XS' } });
  const largeSize = await prisma.size.create({ data: { name: 'L' } });
  const extraLargeSize = await prisma.size.create({ data: { name: 'XL' } });

  const products = [{
          name: 'Ilusion',
          description: 'Luxury big sofa',
          longDescription: 'Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.',
          image: 'https://furniro-shop-images.s3.amazonaws.com/lolitoSofa.png',
          productSkus: {
            create: [
              createSkuData('Ilusion Sofa', ofwhiteColor.id,'off-white', oneSize.id, 'OS', 14000.0, 7000.0, 50, false, 5, null, uuidv4()),
            ],
          }
        }
      ];
    // {
    //   name: 'Benefit',
    //   description: 'Luxury big sofa',
    //   longDescription: 'Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.',
    //   image: 'https://furniro-shop-images.s3.amazonaws.com/asgaardBlueL.png',
    //   productSkus: {
    //     create: [
    //       createSkuData('Asgaard sofa', blueColor.id, 'blue', largeSize.id, 'L', 250000.0, null, null, false, 3, 'https://furniro-shop-images.s3.amazonaws.com/asgaardBlueL.png', '001'),
    //       createSkuData('Asgaard sofa', blueColor.id, 'blue',extraLargeSize.id, 'XL',250000.0, null, null, false, 3, 'https://furniro-shop-images.s3.amazonaws.com/asgaardBlueXl.png', '002'),
    //       createSkuData('Asgaard sofa', blackColor.id, 'black',largeSize.id, 'L',250000.0, null, null, false, 3, 'https://furniro-shop-images.s3.amazonaws.com/asgaardBlackL.png', '003'),
    //       createSkuData('Asgaard sofa', caramelColor.id, 'caramel',extraSmallSize.id, 'XS',250000.0, null, null, false, 3, 'https://furniro-shop-images.s3.amazonaws.com/asgaardCaramelXs.png', '004'),
    //       createSkuData('Asgaard sofa', caramelColor.id, 'caramel',largeSize.id, 'L',250000.0, null, null, false, 3, 'https://furniro-shop-images.s3.amazonaws.com/asgaardCaramelL.png', '005'),
    //     ],
    //   },
    // },
  

  for (const product of products) {
    await prisma.product.create({
      data: product,
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


   // {
        //   name: 'Syltherine',
        //   description: 'Stylish cafe chair',
        //   image: 'https://furniro-shop-images.s3.amazonaws.com/syltherineChair.png',
        //   productSkus: {
        //     create: [
        //       createSkuData('Syltherine Chair', 'White', 'OS', whiteColor.id, oneSize.id, 3500.000, 2500.000, 30, false, 1, null, uuidv4()),
        //     ],
        //   },
        // },
        // {
        //   name: 'Leviosa',
        //   description: 'Stylish cafe chair',
        //   image: 'https://furniro-shop-images.s3.amazonaws.com/leviosaChair.png',
        //   productSkus: {
        //     create: [
        //       createSkuData('Leviosa Chair', 'White', 'OS', whiteColor.id, oneSize.id, 2500.000, null, null, false, 1, null, uuidv4()),
        //     ],
        //   },
        // },
        // {
        //   name: 'Lolito',
        //   description: 'Luxury big sofa',
        //   image: 'https://furniro-shop-images.s3.amazonaws.com/lolitoSofa.png',
        //   productSkus: {
        //     create: [
        //       createSkuData('Lolito Sofa', 'White', 'OS', whiteColor.id, oneSize.id, 14000.000, 7000.000, 50, false, 1, null, uuidv4()),
        //     ],
        //   },
        // },