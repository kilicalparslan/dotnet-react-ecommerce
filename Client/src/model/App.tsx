import { useEffect, useState } from "react";
import { IProduct } from "./IProduct";
import Header from "./Header";
import ProductList from "./ProductList";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:5057/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now(),
        name: "product 4",
        price: 4000,
        isActive: true,
      },
    ]);
  };
  return (
    <>
      <Header products={products} />
      <ProductList products={products} addProduct={addProduct} />
    </>
  );
}

export default App;
