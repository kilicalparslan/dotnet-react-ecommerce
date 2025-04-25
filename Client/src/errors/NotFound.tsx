import { Button, Card, Container, Divider, Typography } from "@mui/material";
import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <Container component={Card} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Not Found
      </Typography>
      <Divider />
      <Button
        variant="contained"
        component={NavLink}
        to="/catalog"
        sx={{ mt: 2 }}
      >
        continue Shopping
      </Button>
    </Container>
  );
}
