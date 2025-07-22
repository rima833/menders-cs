import { 
  ShieldCheckIcon, 
  TruckIcon, 
  CreditCardIcon, 
  UserGroupIcon,
  PhoneIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Verified Vendors',
    description: 'All our vendors are thoroughly vetted and verified to ensure quality and authenticity.'
  },
  {
    icon: TruckIcon,
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery across all 36 states in Nigeria with real-time tracking.'
  },
  {
    icon: CreditCardIcon,
    title: 'Secure Payments',
    description: 'Multiple secure payment options including OPay, PalmPay, Paystack, and bank transfers.'
  },
  {
    icon: UserGroupIcon,
    title: 'Customer Support',
    description: '24/7 customer support to help you with any questions or concerns.'
  },
  {
    icon: PhoneIcon,
    title: 'Easy Returns',
    description: 'Hassle-free return policy within 7 days for your peace of mind.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Wide Selection',
    description: 'Thousands of products from verified vendors across Nigeria in one place.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose StyleMart?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best online shopping experience in Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <feature.icon className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Shopping?
          </h3>
          <p className="text-lg mb-6 text-indigo-100">
            Join thousands of satisfied customers shopping on Nigeria's most trusted marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Products
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}