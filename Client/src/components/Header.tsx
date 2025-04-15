import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export default function Header(props: any) {
  return (
    <AppBar sx={{ mb: 4 }} position="static" color="primary">
      <Toolbar>
        <Container>
          <Typography variant="h6">E-Commerce</Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
