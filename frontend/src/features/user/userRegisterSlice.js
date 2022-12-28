import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginSuccess } from "./userSlice";

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const { name, email, password } = userData;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/user`,
        { name, email, password },
        config
      );
      dispatch(loginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      const erroMessage = error?.response?.data?.message ?? error.message;
      throw erroMessage;
    }
  }
);

const initialState = {};
const userRegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state, action) => {
      state.isLoading = true;
      state.userInfo = null;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.userInfo = null;
    });
  },
});

export default userRegisterSlice.reducer;
