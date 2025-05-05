import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../model/ICart";
import requests from "../../api/requests";
import { act } from "react";

interface CartState {
  cart: Cart | null;
  status: string;
}

const initialState: CartState = {
  cart: null,
  status: "idle",
};

export const addItemToCart = createAsyncThunk<
  Cart,
  { productId: number; quantity?: number }
>("cart/addItemToCart", async ({ productId, quantity = 1 }) => {
  try {
    return await requests.cart.addItem(productId, quantity);
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
});

export const deleteItemFromCart = createAsyncThunk<
  Cart,
  { productId: number; quantity?: number; key?: string }
>("cart/deleteItemFromCart", async ({ productId, quantity = 1 }) => {
  try {
    return await requests.cart.deleteItem(productId, quantity);
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemToCart.pending, (state, action) => {
      console.log("pending", action);
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });
    builder.addCase(addItemToCart.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(deleteItemFromCart.pending, (state, action) => {
      console.log("pending", action);
      state.status =
        "pendingDeleteItem" + action.meta.arg.productId + action.meta.arg.key;
    });
    builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });
    builder.addCase(deleteItemFromCart.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const { setCart, clearCart } = cartSlice.actions;
