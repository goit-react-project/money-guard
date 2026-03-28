import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

export const fetchTransactions = createAsyncThunk(
  'finance/fetchTransactions',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/transactions');
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch transactions.";

      toast.error(message);       /// ND EKLENEN KISIM

      return thunkAPI.rejectWithValue(message);
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
      toast.success('Transaction updated.');
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to update transaction.'
      );
      return thunkAPI.rejectWithValue(error.message);
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

      const response = await axiosInstance.get(
        'https://api.monobank.ua/bank/currency'
      );
      const filtered = response.data.filter(
        (item) =>
          (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
          item.currencyCodeB === 980
      );

      localStorage.setItem('currencyData', JSON.stringify(filtered));
      localStorage.setItem('currencyTimestamp', String(Date.now()));

      return filtered;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
