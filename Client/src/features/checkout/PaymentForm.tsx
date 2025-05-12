import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_name", { required: "card name is required" })}
          label="Enter card name"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.card_name}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_number", { required: "card number is required" })}
          label="Enter card number"
          fullWidth
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.card_number}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_expiry_date", { required: "expiry date is required" })}
          label="Enter expiry date"
          fullWidth
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.card_expiry_date}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_cvv", { required: "cvv is required" })}
          label="Enter CVV"
          fullWidth
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.card_cvv}
        ></TextField>
      </Grid>
    </Grid>
  );
}
