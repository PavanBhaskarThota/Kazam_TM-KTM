import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../Types/commonTypes";
import authServices from "../../services/authServices";
import toast from "react-hot-toast";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const res = await authServices.createUser(userData);
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const res = await authServices.loginUser(userData);
      if (res.status === 200) {
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
        if (action.payload.message === "User already exists!") {
          toast.error("User already exists with this email");
          state.status = "failed";
        } else {
          toast.success("User created successfully");
          saveUserToLocalStorage(action.payload);
          state.status = "success";
          state.user = action.payload.user;
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;

        const obj = {
          user: action.payload.userDetails,
          token: action.payload.accessToken,
          message:'Logged in successfully',
          error:''
        }

        console.log(obj)

        const status = saveUserToLocalStorage(obj);
        if (status) {
          state.status = "succeeded";
          state.user = action.payload.user;
        } else {
          state.status = "failed";
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

const saveUserToLocalStorage = ({ user, token, message, error }: any) => {
  console.log('triggered')
  if (user && token) {
    toast.success("Logged in successfully");
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    return true;
  } else {
    if (error) {
      toast.error(error);
    } else {
      toast.error(message);
    }
    return false;
  };

};

export default userSlice.reducer;
