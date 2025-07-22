'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { logout } from '../../features/auth/authSlice';
import { toggleCart } from '../../features/cart/cartSlice';
import { 
  ShoppingBagIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  MagnifyingGlassIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { totalItems } = useSelector((state: RootState) => state.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-indigo-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <p>Free shipping on orders over ₦50,000</p>
            <div className="flex space-x-4">
              <Link href="/help" className="hover:text-indigo-200">Help</Link>
              <Link href="/track-order" className="hover:text-indigo-200">Track Order</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-indigo-600 text-white p-2 rounded-lg">
                <span className="text-xl font-bold">SM</span>
              </div>
              <span className="text-xl font-bold text-gray-900">StyleMart</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands, vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="text-gray-600 hover:text-gray-900 relative">
              <HeartIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Cart */}
            <button 
              onClick={() => dispatch(toggleCart())}
              className="text-gray-600 hover:text-gray-900 relative"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <UserIcon className="h-6 w-6" />
                  <span className="hidden sm:block">{user?.firstName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Orders
                  </Link>
                  {user?.role === 'vendor' && (
                    <Link href="/vendor/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Vendor Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
                  Sign in
                </Link>
                <Link href="/auth/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 pb-4">
          <Link href="/products" className="text-gray-600 hover:text-gray-900 font-medium">
            All Products
          </Link>
          <Link href="/categories/fashion" className="text-gray-600 hover:text-gray-900 font-medium">
            Fashion
          </Link>
          <Link href="/categories/electronics" className="text-gray-600 hover:text-gray-900 font-medium">
            Electronics
          </Link>
          <Link href="/categories/beauty" className="text-gray-600 hover:text-gray-900 font-medium">
            Beauty
          </Link>
          <Link href="/categories/home" className="text-gray-600 hover:text-gray-900 font-medium">
            Home & Garden
          </Link>
          <Link href="/vendors" className="text-gray-600 hover:text-gray-900 font-medium">
            Vendors
          </Link>
        </nav>

        {/* Mobile Search */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link href="/products" className="block py-2 text-gray-600">All Products</Link>
            <Link href="/categories/fashion" className="block py-2 text-gray-600">Fashion</Link>
            <Link href="/categories/electronics" className="block py-2 text-gray-600">Electronics</Link>
            <Link href="/categories/beauty" className="block py-2 text-gray-600">Beauty</Link>
            <Link href="/categories/home" className="block py-2 text-gray-600">Home & Garden</Link>
            <Link href="/vendors" className="block py-2 text-gray-600">Vendors</Link>
          </div>
        </div>
      )}
    </header>
  );
}