import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Types
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'buyer' | 'vendor' | 'admin';
  avatar?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  vendorProfile?: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

// Async thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role?: 'buyer' | 'vendor';
    vendorData?: any;
  }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error: any) {
      localStorage.removeItem('token');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get user'
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData: Partial<User>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      const response = await axios.put(`${API_URL}/auth/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Profile update failed'
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to send reset email'
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      // Update profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
      })
      // Forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;