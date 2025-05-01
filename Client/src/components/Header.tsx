import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router";
import { useCartContext } from "../context/CartContext";

const links = [
  { name: "Home", path: "/" },
  { name: "Catalog", path: "/catalog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Error", path: "/error" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "text.primary",
  },
  "&.active": {
    color: "warning.main",
  },
};

export default function Header() {
  const { cart } = useCartContext();
  const itemCount =
    cart?.cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0;
  return (
    <AppBar sx={{ mb: 4 }} position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">E-Commerce</Typography>
          <List sx={{ display: "flex", flexDirection: "row", ml: 2 }}>
            {links.map((link) => (
              <ListItem
                key={link.path}
                component={NavLink}
                to={link.path}
                sx={navStyles}
              >
                {link.name}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            component={Link}
            to="/cart"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
