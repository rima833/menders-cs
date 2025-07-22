import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: {
    name: string;
    value: string;
  };
  vendorId: string;
  vendorName: string;
  stock: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  isOpen: boolean;
  coupon?: {
    code: string;
    discount: number;
    type: 'percentage' | 'fixed';
  };
}

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  isOpen: false,
};

// Helper functions
const calculateTotals = (state: CartState) => {
  state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  state.subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate shipping (simple logic - can be enhanced)
  const vendors = new Set(state.items.map(item => item.vendorId));
  state.shipping = vendors.size * 500; // 500 per vendor
  
  // Calculate tax (7.5% VAT in Nigeria)
  state.tax = state.subtotal * 0.075;
  
  // Apply coupon discount
  let discount = 0;
  if (state.coupon) {
    if (state.coupon.type === 'percentage') {
      discount = (state.subtotal * state.coupon.discount) / 100;
    } else {
      discount = Math.min(state.coupon.discount, state.subtotal);
    }
  }
  
  state.total = state.subtotal + state.shipping + state.tax - discount;
};

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'id'>>) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => 
          item.productId === newItem.productId && 
          item.variant?.value === newItem.variant?.value
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const existingItem = state.items[existingItemIndex];
        const newQuantity = existingItem.quantity + newItem.quantity;
        
        if (newQuantity <= newItem.stock) {
          existingItem.quantity = newQuantity;
        } else {
          existingItem.quantity = newItem.stock;
        }
      } else {
        // Add new item
        const cartItem: CartItem = {
          id: `${newItem.productId}-${newItem.variant?.value || 'default'}-${Date.now()}`,
          ...newItem,
        };
        state.items.push(cartItem);
      }
      
      calculateTotals(state);
    },
    
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      calculateTotals(state);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else if (quantity <= item.stock) {
          item.quantity = quantity;
        }
      }
      
      calculateTotals(state);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.coupon = undefined;
      calculateTotals(state);
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    openCart: (state) => {
      state.isOpen = true;
    },
    
    closeCart: (state) => {
      state.isOpen = false;
    },
    
    applyCoupon: (state, action: PayloadAction<{
      code: string;
      discount: number;
      type: 'percentage' | 'fixed';
    }>) => {
      state.coupon = action.payload;
      calculateTotals(state);
    },
    
    removeCoupon: (state) => {
      state.coupon = undefined;
      calculateTotals(state);
    },
    
    syncCartFromServer: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      calculateTotals(state);
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  applyCoupon,
  removeCoupon,
  syncCartFromServer,
} = cartSlice.actions;

export default cartSlice.reducer;