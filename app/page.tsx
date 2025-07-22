'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { fetchFeaturedProducts } from './features/products/productsSlice';
import { getCurrentUser } from './features/auth/authSlice';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import FeaturedProducts from './components/home/FeaturedProducts';
import Categories from './components/home/Categories';
import WhyChooseUs from './components/home/WhyChooseUs';
import Footer from './components/layout/Footer';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Get current user if token exists
    if (token && !isAuthenticated) {
      dispatch(getCurrentUser());
    }

    // Fetch featured products
    dispatch(fetchFeaturedProducts());
  }, [dispatch, token, isAuthenticated]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
}
