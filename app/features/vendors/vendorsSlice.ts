import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Basic vendors slice
const vendorsSlice = createSlice({
  name: 'vendors',
  initialState: {
    vendors: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add cases here when implementing vendor functionality
  },
});

export const { clearError } = vendorsSlice.actions;
export default vendorsSlice.reducer;