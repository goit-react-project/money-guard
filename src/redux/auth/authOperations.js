import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTransactions } from "../finance/financeSlice";
import axiosInstance, {
  setAuthHeader,
  clearAuthHeader,
} from '../../utils/axiosInstance';

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/sign-up", credentials);

      setAuthHeader(response.data.token);
      localStorage.setItem("token", response.data.token);                       /// ND

      // Backend'den gelen transactions varsa finance state'e yaz
      if (response.data.transactions) {
        thunkAPI.dispatch(setTransactions(response.data.transactions));
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Register failed."
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      // Backend'e login isteği
      const response = await axiosInstance.post("/auth/sign-in", credentials);

      // Token'ı Axios header'a ekle
      setAuthHeader(response.data.token);

      // Token'ı localStorage'a kaydet
      localStorage.setItem("token", response.data.token);         /// ND 

      // Backend'den gelen transactions varsa finance state'e yaz
      if (response.data.transactions) {
        thunkAPI.dispatch(setTransactions(response.data.transactions));
      }

      // Redux auth state'e döndür
      return response.data;
    } catch (error) {
      //  Hata durumunda reject ediyor
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed."
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axiosInstance.delete('/auth/sign-out');
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Logout failed.'
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (!token) return thunkAPI.rejectWithValue('No token found');
    try {
      setAuthHeader(token);
      const response = await axiosInstance.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Session expired.'
      );
    }
  }
);
