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
import { LoadingButton } from "@mui/lab";
import { currencyUSD } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const { status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

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
          {currencyUSD.format(product.price)}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          size="small"
          loading={status === "pendingAddItem" + product.id}
          variant="outlined"
          loadingPosition="start"
          startIcon={<AddShoppingCart />}
          onClick={() => dispatch(addItemToCart({ productId: product.id }))}
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
