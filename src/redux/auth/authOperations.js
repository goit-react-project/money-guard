import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance, {
  setAuthHeader,
  clearAuthHeader,
} from "../../utils/axiosInstance";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/sign-up", credentials);
      setAuthHeader(response.data.token);
      toast.success("Registration successful!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/sign-in", credentials);
      setAuthHeader(response.data.token);
      toast.success("Login successful!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.delete("/auth/sign-out");
      clearAuthHeader();
    } catch (error) {
      toast.error("Logout failed.");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (!token) return thunkAPI.rejectWithValue("No token found");
    try {
      setAuthHeader(token);
      const response = await axiosInstance.get("/auth/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
