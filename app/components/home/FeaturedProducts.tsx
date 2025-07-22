'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';

export default function FeaturedProducts() {
  const { featuredProducts, isLoading } = useSelector((state: RootState) => state.products);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-300 h-6 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of top-rated products from verified vendors
          </p>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.images[0]?.url || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.comparePrice && product.comparePrice > product.price && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {product.vendor.isVerified ? '✓ Verified' : 'Vendor'}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating.average)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        ({product.rating.count})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          ₦{product.price.toLocaleString()}
                        </span>
                        {product.comparePrice && product.comparePrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ₦{product.comparePrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      by {product.vendor.businessName}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured products available at the moment.</p>
            <Link
              href="/products"
              className="inline-block mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}