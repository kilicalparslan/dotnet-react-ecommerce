import { useEffect, useState } from "react";
import { IProduct } from "../model/IProduct";
import Header from "./Header";
import ProductList from "./ProductList";
import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";

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
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
