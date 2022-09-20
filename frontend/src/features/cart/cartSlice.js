import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAddItem(state, { payload }) {
      const existItem = state.cartItems.find(
        (x) => x.product === payload.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? payload : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }
    },
  },
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productData, { dispatch, getState }) => {
    try {
      const { id, qty } = productData;
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      dispatch(
        cartSlice.actions.cartAddItem({
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          qty,
        })
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      const erroMessage = error?.response?.data?.message ?? error.message;
      throw erroMessage;
    }
  }
);

export default cartSlice.reducer;
