import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router";
import { logout } from "../features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearCart } from "../features/cart/cartSlice";

const links = [
  { name: "Home", path: "/" },
  { name: "Catalog", path: "/catalog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Error", path: "/error" },
];

const authLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
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
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
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
          {user ? (
            <>
              <List sx={{ display: "flex", flexDirection: "row", ml: 2 }}>
                <Button sx={navStyles}>{user.name}</Button>
                <Button
                  sx={navStyles}
                  onClick={() => {
                    dispatch(logout());
                    dispatch(clearCart());
                  }}
                >
                  Logout
                </Button>
              </List>
            </>
          ) : (
            <>
              <List sx={{ display: "flex", flexDirection: "row", ml: 2 }}>
                {authLinks.map((link) => (
                  <ListItem
                    key={link.path}
                    component={NavLink}
                    to={link.path}
                    sx={navStyles}
                  >
                    {link.title}
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
