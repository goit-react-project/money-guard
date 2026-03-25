import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  fetchCategories,
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchStatistics,
  fetchCurrency,
} from "./financeOperations";

const initialState = {
  transactions: [],
  categories: [],
  statistics: [],
  totalBalance: 0,
  currency: [],
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Transactions
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload.data;
      state.totalBalance = action.payload.data.reduce(
        (acc, t) => (t.type === "INCOME" ? acc + t.amount : acc - t.amount),
        0,
      );
    });
    // Categories
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    // Add transaction
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.transactions.unshift(action.payload);
      state.totalBalance =
        action.payload.type === "INCOME"
          ? state.totalBalance + action.payload.amount
          : state.totalBalance - action.payload.amount;
    });
    // Delete transaction
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      const deleted = state.transactions.find(
        (t) => t.id === action.payload.id,
      );
      if (deleted) {
        state.totalBalance =
          deleted.type === "INCOME"
            ? state.totalBalance - deleted.amount
            : state.totalBalance + deleted.amount;
      }
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload.id,
      );
    });
    // Edit transaction
    builder.addCase(editTransaction.fulfilled, (state, action) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id,
      );
      if (index !== -1) state.transactions[index] = action.payload;
    });
    // Statistics
    builder.addCase(fetchStatistics.fulfilled, (state, action) => {
      state.statistics = action.payload;
    });
    // Currency
    builder.addCase(fetchCurrency.fulfilled, (state, action) => {
      state.currency = action.payload;
    });
  },
});

export default financeSlice.reducer;

// Selectors
export const selectTransactions = (state) => state.finance.transactions;
export const selectCategories = (state) => state.finance.categories;
export const selectStatistics = (state) => state.finance.statistics;
export const selectTotalBalance = (state) => state.finance.totalBalance;
export const selectCurrency = (state) => state.finance.currency;
