import { DeliveryDining, Payments } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function Review() {
  const { getValues } = useFormContext();
  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <Stack
        direction="column"
        divider={<Divider />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
          >
            <DeliveryDining color="primary" />
            Delivery Information
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {getValues("firstname")} {getValues("lastname")}
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {getValues("phone")}
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {getValues("addressline")} / {getValues("city")}
          </Typography>
        </div>
        <div>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
          >
            <Payments color="primary" />
            Payment Information
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {getValues("cardname")}
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {getValues("cardnumber")}
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {getValues("cardexpiremonth")} / {getValues("cardexpireyear")}
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {getValues("cardcvc")}
          </Typography>
        </div>
      </Stack>
    </Stack>
  );
}