import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Routes";
import { CartContextProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </React.StrictMode>
);
