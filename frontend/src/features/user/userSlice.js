import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "user/login",
  async (userData, { dispatch, rejectWithValue }) => {
    console.log("login", { userData });
    try {
      const { email, password } = userData;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/user/login`,
        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      const erroMessage = error?.response?.data?.message ?? error.message;
      throw erroMessage;
    }
  }
);

const initialState = {};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, { payload }) {
      localStorage.removeItem("userInfo");
      return { ...state, userInfo: null };
    },
    loginSuccess(state, { payload }) {
      return { ...state, userInfo: payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
      state.userInfo = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      return { ...state, userInfo: action.payload, isLoading: false };
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.userInfo = null;
    });
  },
});
export const { logout, loginSuccess } = userSlice.actions;
export default userSlice.reducer;
