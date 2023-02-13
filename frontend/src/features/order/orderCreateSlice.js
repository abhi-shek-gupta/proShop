import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "order/create",
  async (order, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      console.log({ order });
      // return;
      const { data } = await axios.post(
        `http://localhost:5000/api/orders`,
        order,
        config
      );
      return data;
    } catch (error) {
      const erroMessage = error?.response?.data?.message ?? error.message;
      throw erroMessage;
    }
  }
);

const initialState = {};
const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      return {
        ...state,
        success: true,
        order: action.payload,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.user = null;
    });
  },
});

export default createOrderSlice.reducer;
