function generateSKU(productName: string, color: string, size: string, uniqueId: string) {
    const formattedName = productName.replace(/\s+/g, '').toUpperCase();
    const formattedColor = color.replace(/\s+/g, '').toUpperCase();
    const formattedSize = size.replace(/\s+/g, '').toUpperCase();
  
    const sku = `${formattedName}-${formattedColor}-${formattedSize}-${uniqueId}`;
  
    return sku;
  }
  export { generateSKU }