import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../Types/commonTypes";
import authServices from "../../services/authServices";
import toast from "react-hot-toast";
import api from "../../Api";
import tokenServices from "../../services/tokenServices";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const res = await authServices.createUser(userData);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error: any) {
      console.log(error);
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
        console.log(res.data);
        return res.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
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
  user: null,
  status: "",
  error: "",
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
      const user = JSON.parse(localStorage.getItem("user") ?? "null");
      if (user !== "null") state.user = user;
    },
    logout: (state) => {
      toast.success("Logged out successfully");
      tokenServices.clearStorage();
      api.defaults.headers["Authorization"] = "";
      state.user = null;
      // state.userNameTaken = null;
      state.status = "";
      state.error = "";
      // state.userProfileData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload.message === "User already exists!") {
          toast.error("User already exists with this email");
          state.status = "";
        } else if (action.payload.message === "Invalid credentials") {
          toast.error("Invalid credentials");
          state.status = "";
        } else if (action.payload.message === "User created successfully") {
          const obj = {
            user: action.payload.userDetails,
            token: action.payload.token,
            message: action.payload.message,
            error: "",
          };
          saveUserToLocalStorage(obj);
          state.status = "success";
          state.user = action.payload.user;
        }else{
          state.status = "failed";
          if (action.payload.message) {
            state.error = action.payload.message;
            toast.error(action.payload.message);
          }
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) {
          state.error = action.error.message;
          toast.error(action.error.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;

        const obj = {
          user: action.payload.userDetails,
          token: action.payload.token,
          message: action.payload.message,
          error: "",
        };

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
  }
};

export const { getUser, logout } = userSlice.actions;
export default userSlice.reducer;
