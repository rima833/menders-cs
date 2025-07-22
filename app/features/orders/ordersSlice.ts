import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Basic orders slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add cases here when implementing order functionality
  },
});

export const { clearError } = ordersSlice.actions;
export default ordersSlice.reducer;