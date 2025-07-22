import Link from 'next/link';

const categories = [
  {
    name: 'Fashion & Clothing',
    slug: 'fashion',
    icon: '👗',
    description: 'Latest trends and styles',
    color: 'bg-pink-100 text-pink-800'
  },
  {
    name: 'Electronics',
    slug: 'electronics',
    icon: '📱',
    description: 'Gadgets and tech accessories',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    name: 'Beauty & Personal Care',
    slug: 'beauty',
    icon: '💄',
    description: 'Skincare and cosmetics',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    name: 'Home & Garden',
    slug: 'home',
    icon: '🏠',
    description: 'Home improvement and decor',
    color: 'bg-green-100 text-green-800'
  },
  {
    name: 'Sports & Outdoors',
    slug: 'sports',
    icon: '⚽',
    description: 'Sports gear and equipment',
    color: 'bg-orange-100 text-orange-800'
  },
  {
    name: 'Books & Media',
    slug: 'books',
    icon: '📚',
    description: 'Books and educational materials',
    color: 'bg-indigo-100 text-indigo-800'
  },
  {
    name: 'Health & Wellness',
    slug: 'health',
    icon: '🏥',
    description: 'Health products and supplements',
    color: 'bg-red-100 text-red-800'
  },
  {
    name: 'Automotive',
    slug: 'automotive',
    icon: '🚗',
    description: 'Car parts and accessories',
    color: 'bg-gray-100 text-gray-800'
  }
];

export default function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of product categories from trusted vendors across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center border border-gray-100 hover:border-indigo-200">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{category.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${category.color}`}>
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}