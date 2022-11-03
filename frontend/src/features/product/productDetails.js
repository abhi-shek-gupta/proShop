import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (productData) => {
    try {
      const { id } = productData;
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      return data;
    } catch (error) {
      const erroMessage = error?.response?.data?.message ?? error.message;
      throw erroMessage;
    }
  }
);
const initialState = {
  isLoading: false,
  product: { reviews: [] },
};
const productDetails = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      return { ...state, product: action.payload, isLoading: false };
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      return { ...state, isLoading: false, error: action.error };
    });
  },
});

export default productDetails.reducer;
