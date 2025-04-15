import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IProduct } from "../model/IProduct";
import { AddShoppingCart, Visibility } from "@mui/icons-material";

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
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
        <Button
          startIcon={<AddShoppingCart />}
          size="small"
          variant="outlined"
          color="success"
        >
          Add to cart
        </Button>
        <Button
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
