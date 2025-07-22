import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Nigeria's Premier{' '}
              <span className="text-yellow-300">Multi-Vendor</span>{' '}
              Marketplace
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Discover amazing products from verified vendors across Nigeria. 
              Shop with confidence using secure payment methods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/products" 
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors text-center"
              >
                Start Shopping
              </Link>
              <Link 
                href="/auth/register?role=vendor" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-colors text-center"
              >
                Become a Vendor
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-sm">Verified Vendors</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">50k+</div>
                  <div className="text-sm">Products</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">100k+</div>
                  <div className="text-sm">Happy Customers</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">36</div>
                  <div className="text-sm">States Covered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}