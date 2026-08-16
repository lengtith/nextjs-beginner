export default function TypescriptPage() {
  interface Product {
    quality: number;
    price: number;
  }

  const amount = (product: Product): string => {
    return `${product.quality} x ${product.price}= ${product.quality * product.price}`;
  };

  return (
    <div>
      <h1>TypeScript Page</h1>
      <p>{amount({ quality: 40, price: 50 })}</p>
    </div>
  );
}
