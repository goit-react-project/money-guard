import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTransactions,
  fetchCategories,
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchStatistics,
  fetchCurrency,
} from './financeOperations';

const initialState = {
  transactions: [],
  categories: [],
  statistics: null,
  totalBalance: 0,
  currency: [],
  isLoading: false,
  error: null,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Transactions
    builder.addCase(fetchTransactions.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload.data;
      state.totalBalance = action.payload.data.reduce(
        (acc, t) => (t.type === 'INCOME' ? acc + t.amount : acc - t.amount),
        0
      );
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = Array.isArray(action.payload) ? action.payload : [];
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Add transaction
    builder.addCase(addTransaction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.transactions.unshift(action.payload);
      state.totalBalance =
        action.payload.type === 'INCOME'
          ? state.totalBalance + action.payload.amount
          : state.totalBalance - action.payload.amount;
    });
    builder.addCase(addTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Delete transaction
    builder.addCase(deleteTransaction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      const deleted = state.transactions.find(
        (t) => t.id === action.payload.id
      );
      if (deleted) {
        state.totalBalance =
          deleted.type === 'INCOME'
            ? state.totalBalance - deleted.amount
            : state.totalBalance + deleted.amount;
      }
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload.id
      );
    });
    builder.addCase(deleteTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Edit transaction
    builder.addCase(editTransaction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      
      if (index !== -1) {
        // Eski işlemi al
        const oldTransaction = state.transactions[index];
        const newTransaction = action.payload;

        // İşlemi listede güncelle
        state.transactions[index] = newTransaction;

        // Önce eski işlemi bakiyeden "geri alıyoruz"
        if (oldTransaction.type === "INCOME") {
          state.totalBalance -= oldTransaction.amount;
        } else {
          state.totalBalance += oldTransaction.amount; // Giderdi, geri ekliyoruz
        }

        // Sonra yeni işlemi bakiyeye "ekliyoruz"
        if (newTransaction.type === "INCOME") {
          state.totalBalance += newTransaction.amount;
        } else {
          state.totalBalance -= newTransaction.amount;
        }
      }
    });
    builder.addCase(editTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Statistics
    builder.addCase(fetchStatistics.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchStatistics.fulfilled, (state, action) => {
      state.isLoading = false;
      state.statistics = action.payload;
    });
    builder.addCase(fetchStatistics.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Currency
    builder.addCase(fetchCurrency.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCurrency.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currency = action.payload;
    });
    builder.addCase(fetchCurrency.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default financeSlice.reducer;
