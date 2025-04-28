import { useEffect, useState } from "react";
import requests from "../../api/requests";
import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Cart } from "../../model/ICarts";
import { Delete } from "@mui/icons-material";

export default function ShoppingCartPage() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Cart | null>(null);
  useEffect(() => {
    requests.cart
      .get()
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;

  if (!cart) return <h1>No items in the cart</h1>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.cartItems.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  src={`http://localhost:5057/images/${item.imageUrl}`}
                  alt={item.name}
                  style={{ height: 60 }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">${item.price.toFixed(2)}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">
                ${(item.price * item.quantity).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
