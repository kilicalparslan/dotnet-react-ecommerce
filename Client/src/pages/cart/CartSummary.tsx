import { TableCell, TableRow } from "@mui/material";
import { useCartContext } from "../../context/CartContext";
import { currencyUSD } from "../../utils/formatCurrency";

export default function CartSummary() {
  const { cart } = useCartContext();
  const subTotal =
    cart?.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    ) ?? 0;
  const tax = subTotal * 0.2;
  const total = subTotal + tax;
  return (
    <>
      <TableRow>
        <TableCell colSpan={5} align="right">
          Subtotal
        </TableCell>
        <TableCell align="right">{currencyUSD.format(subTotal)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} align="right">
          Tax (20%)
        </TableCell>
        <TableCell align="right">{currencyUSD.format(tax)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} align="right">
          Total
        </TableCell>
        <TableCell align="right">{currencyUSD.format(total)}</TableCell>
      </TableRow>
    </>
  );
}
