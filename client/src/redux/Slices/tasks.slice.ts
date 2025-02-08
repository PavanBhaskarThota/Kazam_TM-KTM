import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskServices from "../../services/taskServices";
import toast from "react-hot-toast";

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await taskServices.getTasks(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addTask = createAsyncThunk(
  "task/addTask",
  async ({ task, id }: any, { rejectWithValue }) => {
    try {
      const res = await taskServices.createTask(task, id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ task, id }: any, { rejectWithValue }) => {
    try {
      console.log(task);
      const res = await taskServices.updateTask(task, id);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await taskServices.deleteTask(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  tasks: [] as any,
  status: "",
  message: "",
  error: "" as any,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "success";
        state.message = "added successfully";
        state.tasks = [...state.tasks, action.payload];
        toast.success("Task added successfully");
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Failed to add task");
      })
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "success";
        state.message = "updated successfully";
        console.log(state.tasks)
        state.tasks = state.tasks.map((task: any) =>
          task._id === action.payload._id ? action.payload : task
        );        
        console.log(state.tasks);
        toast.success("Task updated successfully");
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Failed to update task");
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "success";
        state.message = "deleted successfully";
        state.tasks = state.tasks.filter(
          (task: any) => task._id !== action.payload._id
        );
        toast.success("Task deleted successfully");
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
