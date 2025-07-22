import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Types
interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  vendor: {
    _id: string;
    businessName: string;
    rating: {
      average: number;
      count: number;
    };
    isVerified: boolean;
  };
  category: string;
  subcategory?: string;
  tags: string[];
  price: number;
  comparePrice?: number;
  currency: string;
  images: Array<{
    url: string;
    altText?: string;
    isPrimary: boolean;
  }>;
  variants?: Array<{
    name: string;
    options: Array<{
      value: string;
      price?: number;
      stock?: number;
      sku?: string;
    }>;
  }>;
  inventory: {
    stock: number;
    lowStockThreshold: number;
    trackQuantity: boolean;
    allowBackorder: boolean;
  };
  sku?: string;
  rating: {
    average: number;
    count: number;
  };
  status: 'draft' | 'active' | 'inactive' | 'archived';
  featured: boolean;
  totalSales: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  featuredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sort?: string;
    vendor?: string;
  };
}

// Initial state
const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  featuredProducts: [],
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  },
  filters: {},
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    vendor?: string;
  } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await axios.get(`${API_URL}/products?${queryParams}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products'
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch product'
      );
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products?featured=true&limit=8`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch featured products'
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt' | 'vendor'>, 
         { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      const response = await axios.post(`${API_URL}/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create product'
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }: { 
    id: string; 
    productData: Partial<Product> 
  }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      const response = await axios.put(`${API_URL}/products/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update product'
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      await axios.delete(`${API_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete product'
      );
    }
  }
);

// Products slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data.products;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload.data.product;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch featured products
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload.data.products;
      })
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.unshift(action.payload.data.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.data.product;
        const index = state.products.findIndex(p => p._id === updatedProduct._id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        if (state.currentProduct && state.currentProduct._id === updatedProduct._id) {
          state.currentProduct = updatedProduct;
        }
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.products = state.products.filter(p => p._id !== deletedId);
        if (state.currentProduct && state.currentProduct._id === deletedId) {
          state.currentProduct = null;
        }
      });
  },
});

export const { clearError, setFilters, clearFilters, clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;