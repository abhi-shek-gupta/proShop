import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserDetails = createAsyncThunk(
  "user/Details",
  async (id, { dispatch, rejectWithValue, getState }) => {
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
      const { data } = await axios.get(
        `http://localhost:5000/api/user/${id}`,
        config
      );
      return data;
    } catch (error) {
      const erroMessage = error?.response?.data?.message ?? error.message;
      throw erroMessage;
    }
  }
);

const initialState = { user: {} };
const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.user = null;
    });
  },
});

export default userDetailsSlice.reducer;
