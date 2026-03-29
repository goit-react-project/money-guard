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
  statistics: [],
  totalBalance: 0,
  currency: [],
  loading: false,
  error: null,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
 //  login sonrası backend'den gelen transactions için       /// ND
    setTransactions: (state, action) => {
      state.transactions = action.payload;
      state.totalBalance = action.payload.reduce(
        (acc, t) => (t.type === "INCOME" ? acc + t.amount : acc - t.amount),
        0
      );
    },
  },

  extraReducers: (builder) => {
    // Transactions   /// ND
    builder.addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.totalBalance = action.payload.reduce(
        (acc, t) => (t.type === "INCOME" ? acc + t.amount : acc - t.amount),        
        0
      );
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Categories       ///   ND
    builder
    .addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;   // Burası Redux state'e yazıyor    
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Add transaction
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.transactions.unshift(action.payload);
      state.totalBalance =
        action.payload.type === 'INCOME'
          ? state.totalBalance + action.payload.amount
          : state.totalBalance - action.payload.amount;
    });
    // Delete transaction
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
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
    // Edit transaction
    builder.addCase(editTransaction.fulfilled, (state, action) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
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

export const { setTransactions} = financeSlice.actions;
export default financeSlice.reducer;
