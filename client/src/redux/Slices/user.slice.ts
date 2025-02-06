import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../Types/commonTypes";
import authServices from "../../Services/authServices";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const res = await authServices.createUser(userData);
      if (res.status === 201) {
        return res.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: {},
  status: "",
  error: "null",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
