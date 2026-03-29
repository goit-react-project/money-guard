import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
} from './authOperations';

const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
    balance: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = { id: null, username: null, email: null, balance: null };
      state.token = null;
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    });
    // Login
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    });
    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = { id: null, username: null, email: null, balance: null };
      state.token = null;
      state.isLoggedIn = false;
    });
    // Fetch current user
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.isRefreshing = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.isRefreshing = false;
    });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
