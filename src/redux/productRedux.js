import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    startAction: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    failAction: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // GET products
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },

    // DELETE product
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },

    // UPDATE product
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    },

    // CREATE product
    createProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
  },
});

export const {
  startAction,
  failAction,
  getProductSuccess,
  deleteProductSuccess,
  updateProductSuccess,
  createProductSuccess,
} = productSlice.actions;
export default productSlice.reducer;
