export default function Product(props: any) {
  return (
    <div>
      {props.product.isActive ? (
        <>
          <h3>{props.product.name}</h3>
          <p>{props.product.price}</p>
        </>
      ) : (
        "Ürün yok"
      )}
    </div>
  );
}
