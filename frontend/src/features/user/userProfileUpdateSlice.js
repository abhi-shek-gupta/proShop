import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUserProfile = createAsyncThunk(
  "user/profile/update",
  async (userData, { dispatch, rejectWithValue, getState }) => {
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
      const { data } = await axios.put(
        `http://localhost:5000/api/user/profile`,
        userData,
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
const updateUserProfileSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      return {
        ...state,
        success: true,
        userInfo: action.payload,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.user = null;
    });
  },
});

export default updateUserProfileSlice.reducer;
