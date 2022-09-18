import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartQuantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.cartQuantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProudct: (state, action) => {
      state.cartQuantity -= 1;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload._id),
        1
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    clearCart: (state) => {
      state.products = [];
      state.cartQuantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProudct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
