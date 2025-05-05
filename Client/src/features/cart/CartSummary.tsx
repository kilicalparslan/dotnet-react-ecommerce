import { TableCell, TableRow } from "@mui/material";
import { currencyUSD } from "../../utils/formatCurrency";
import { useAppSelector } from "../../hooks/hooks";

export default function CartSummary() {
  const { cart } = useAppSelector((state) => state.cart);
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
