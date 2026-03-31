import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

// Toast notifications for add/delete/edit are handled in components via .unwrap()
// Only fetchCurrency uses toast here because it has no dedicated component-level handler

export const fetchTransactions = createAsyncThunk(
  'finance/fetchTransactions',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/transactions');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'finance/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/transaction-categories');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'finance/addTransaction',
  async (transactionData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        '/transactions',
        transactionData
      );
      toast.success('Transaction added successfully!');
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to add transaction.'
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'finance/deleteTransaction',
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/transactions/${id}`);
      toast.success('Transaction deleted.');
      return { id };
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to delete transaction.'
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  'finance/editTransaction',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/transactions/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchStatistics = createAsyncThunk(
  'finance/fetchStatistics',
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/transactions-summary', {
        params: { month, year },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCurrency = createAsyncThunk(
  'finance/fetchCurrency',
  async (_, thunkAPI) => {
    try {
      const savedData = localStorage.getItem('currencyData');
      const savedTimestamp = localStorage.getItem('currencyTimestamp');
      const oneHour = 60 * 60 * 1000;

      if (
        savedData &&
        savedTimestamp &&
        Date.now() - Number(savedTimestamp) < oneHour
      ) {
        return JSON.parse(savedData);
      }

      // separate axios instance used because this is an external API
      const response = await axios.get(import.meta.env.VITE_MONOBANK_API_URL);
      const filtered = response.data.filter(
        (item) =>
          (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
          item.currencyCodeB === 980
      );

      localStorage.setItem('currencyData', JSON.stringify(filtered));
      localStorage.setItem('currencyTimestamp', String(Date.now()));

      return filtered;
    } catch (error) {
      toast.error('Failed to fetch currency rates. Please try again later.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
