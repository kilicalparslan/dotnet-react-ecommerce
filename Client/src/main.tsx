import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Routes";
import { Provider } from "react-redux";
import { CartContextProvider } from "./context/CartContext";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </Provider>
  </React.StrictMode>
);
