import { IProduct } from "./IProduct";
import Product from "./Product";

export default function ProductList(props: any) {
  return (
    <div>
      <h2>ProductList</h2>
      {props.products.map((product: IProduct) => (
        <Product key={product.id} product={product} />
      ))}
      <button onClick={props.addProduct}>Add Product</button>
    </div>
  );
}
