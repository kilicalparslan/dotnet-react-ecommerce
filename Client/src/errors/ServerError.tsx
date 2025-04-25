import { Card, Container, Divider, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation();
  return (
    <Container component={Card} sx={{ p: 3 }}>
      {state?.error ? (
        <>
          <Typography variant="h3" gutterBottom>
            {state.error.title} - {state.status}
          </Typography>
          <Divider />
          <Typography variant="body2" gutterBottom>
            {state.error.detail || "Unknown error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}
    </Container>
  );
}
