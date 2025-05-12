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
          {...register("cardname", { required: "card name is required" })}
          label="Enter card name"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardname}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardnumber", { required: "card number is required" })}
          label="Enter card number"
          fullWidth
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardnumber}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <TextField
          {...register("cardexpiremonth", {
            required: "expire month is required",
          })}
          label="Enter expire month"
          fullWidth
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardexpiremonth}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <TextField
          {...register("cardexpireyear", {
            required: "expire year is required",
          })}
          label="Enter expire year"
          fullWidth
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardexpireyear}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          {...register("cardcvc", { required: "cvv is required" })}
          label="Enter CVV"
          fullWidth
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardcvc}
        ></TextField>
      </Grid>
    </Grid>
  );
}
