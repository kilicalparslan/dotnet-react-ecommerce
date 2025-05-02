import {
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../model/IProduct";
import requests from "../../api/requests";
import NotFound from "../../errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { currencyUSD } from "../../utils/formatCurrency";

export default function ProductDetailsPage() {
  const { cart, setCart } = useCartContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const item = cart?.cartItems.find((i) => i.productId === product?.id);

  useEffect(() => {
    requests.catalog
      .details(Number(id))
      .then((data) => setProduct(data))
      .catch((error) => console.log("Error fetching product:", error))
      .finally(() => setLoading(false));
  }, [id]);

  function handleAddItem(productId: number) {
    setIsAdded(true);
    requests.cart
      .addItem(productId)
      .then((cart) => {
        setCart(cart);
        toast.success("Item added to cart");
      })
      .catch((error) => console.log("Error adding item to cart:", error))
      .finally(() => setIsAdded(false));
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xl: 3, lg: 4, md: 5, sm: 6, xs: 12 }}>
        <img
          src={`http://localhost:5057/images/${product.imageUrl}`}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={{ xl: 9, lg: 8, md: 7, sm: 6, xs: 12 }}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {currencyUSD.format(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" sx={{ mt: 3 }} spacing={2} alignItems="center">
          <LoadingButton
            variant="outlined"
            loadingPosition="start"
            startIcon={<AddShoppingCart />}
            loading={isAdded}
            onClick={() => handleAddItem(product.id)}
          >
            Add to cart
          </LoadingButton>

          {item?.quantity! > 0 && (
            <Typography variant="body2">
              {item?.quantity} items added the cart
            </Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
