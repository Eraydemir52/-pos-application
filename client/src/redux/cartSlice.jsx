import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).cartItems
    : [],
  total: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).total
    : 0,
  tax: 8,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (findCartItem) {
        findCartItem.count = findCartItem.count + 1;
      } else {
        state.cartItems.push(action.payload);
      }
      state.total += action.payload.price;
    },
    deleteCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.count;
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartItem.count += 1;
      state.total += cartItem.price;
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartItem.count -= 1;
      if (cartItem.count === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
      state.total -= cartItem.price;
    },
    reset: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, deleteCart, increase, decrease, reset } =
  cartSlice.actions;

export default cartSlice.reducer;
