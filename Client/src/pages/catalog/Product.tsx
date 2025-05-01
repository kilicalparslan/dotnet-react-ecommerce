import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart, Visibility } from "@mui/icons-material";
import { Link } from "react-router";
import { useState } from "react";
import requests from "../../api/requests";
import { LoadingButton } from "@mui/lab";
import { useCartContext } from "../../context/CartContext";

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const { setCart } = useCartContext();

  const handleAddItem = (productId: number) => {
    setLoading(true);
    requests.cart
      .addItem(productId)
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <Card>
      <CardMedia
        sx={{ height: 160, backgroundSize: "contain" }}
        image={`http://localhost:5057/images/${product.imageUrl}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="text-secondary"
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button
          startIcon={<AddShoppingCart />}
          size="small"
          variant="outlined"
          color="success"
          onClick={() => handleAddItem(product.id)}
        >
          Add to cart
        </Button> */}

        <LoadingButton
          size="small"
          loading={loading}
          variant="outlined"
          loadingPosition="start"
          startIcon={<AddShoppingCart />}
          onClick={() => handleAddItem(product.id)}
        >
          Add to cart
        </LoadingButton>

        <Button
          component={Link}
          to={`/catalog/${product.id}`}
          startIcon={<Visibility />}
          size="small"
          variant="outlined"
          color="primary"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
