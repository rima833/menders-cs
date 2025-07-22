# StyleMart - Nigeria's Premier Multi-Vendor Marketplace

StyleMart is a modern, full-stack multi-vendor marketplace built specifically for the Nigerian market. It enables verified vendors to sell their products while providing customers with a secure and seamless shopping experience.

## 🚀 Features

### For Customers
- **Browse & Search**: Explore thousands of products from verified vendors
- **Secure Payments**: Multiple payment options including OPay, PalmPay, Paystack, Flutterwave
- **Order Tracking**: Real-time order status updates
- **Reviews & Ratings**: Read and write product reviews
- **Wishlist**: Save products for later
- **Mobile Responsive**: Beautiful UI that works on all devices

### For Vendors
- **Vendor Dashboard**: Comprehensive analytics and sales reports
- **Product Management**: Easy product listing with multiple images
- **Inventory Tracking**: Stock management with low stock alerts
- **Commission System**: Transparent commission structure
- **Payout Management**: Easy withdrawal to bank accounts or mobile wallets

### For Admins
- **Vendor Verification**: Approve and manage vendor applications
- **User Management**: Manage customers and vendors
- **Order Management**: Monitor and manage all orders
- **Analytics Dashboard**: Platform-wide insights and reports

## 🛠 Tech Stack

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI + Custom Components
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Icons**: Heroicons

### Backend (Node.js + Express)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Payment**: Paystack, Flutterwave APIs
- **Security**: Helmet, CORS, Rate Limiting

### Database
- **Primary**: MongoDB Atlas (Cloud)
- **Local Development**: MongoDB Community Edition

### File Storage
- **Images**: Cloudinary CDN
- **Transformations**: Automatic optimization and format conversion

### Deployment
- **Frontend**: Vercel
- **Backend**: Render/Railway
- **Database**: MongoDB Atlas
- **CDN**: Cloudinary

## 📁 Project Structure

```
stylemart/
├── app/                          # Frontend (Next.js)
│   ├── components/              # Reusable components
│   │   ├── layout/             # Header, Footer, etc.
│   │   ├── home/               # Homepage components
│   │   ├── auth/               # Authentication components
│   │   └── ui/                 # Base UI components
│   ├── features/               # Redux slices
│   │   ├── auth/               # Authentication state
│   │   ├── products/           # Products state
│   │   ├── cart/               # Shopping cart state
│   │   ├── vendors/            # Vendors state
│   │   └── orders/             # Orders state
│   ├── store/                  # Redux store configuration
│   ├── providers/              # React providers
│   └── pages/                  # Next.js pages
│
├── server/                      # Backend (Node.js + Express)
│   ├── models/                 # MongoDB models
│   │   ├── User.js            # User model
│   │   ├── Vendor.js          # Vendor model
│   │   ├── Product.js         # Product model
│   │   ├── Order.js           # Order model
│   │   ├── Review.js          # Review model
│   │   └── Cart.js            # Cart model
│   ├── routes/                 # API routes
│   │   ├── auth.js            # Authentication routes
│   │   ├── products.js        # Product routes
│   │   ├── orders.js          # Order routes
│   │   ├── vendors.js         # Vendor routes
│   │   ├── admin.js           # Admin routes
│   │   ├── payments.js        # Payment routes
│   │   └── upload.js          # File upload routes
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   │   ├── auth.js           # Authentication middleware
│   │   └── errorHandler.js   # Error handling
│   ├── utils/                 # Utility functions
│   │   ├── jwt.js            # JWT utilities
│   │   └── email.js          # Email utilities
│   ├── config/                # Configuration
│   │   ├── database.js       # MongoDB connection
│   │   └── cloudinary.js     # Cloudinary setup
│   └── server.js              # Main server file
│
├── public/                     # Static assets
├── styles/                     # Global styles
└── docs/                       # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- MongoDB (local or Atlas)
- Cloudinary account
- Payment gateway accounts (Paystack, Flutterwave)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/stylemart.git
cd stylemart
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

4. **Set up environment variables**

Create `.env.local` in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Create `.env` in the server directory:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/stylemart

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Payment Gateways
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-your_flutterwave_secret_key
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-your_flutterwave_public_key

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. **Start the development servers**

Backend:
```bash
cd server
npm run dev
```

Frontend (in a new terminal):
```bash
npm run dev
```

The frontend will be available at http://localhost:3000 and the backend at http://localhost:5000.

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Full Stack
- `npm run dev:full` - Start both frontend and backend concurrently

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/forgot-password` - Forgot password
- `PUT /api/auth/reset-password/:token` - Reset password

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (vendor only)
- `PUT /api/products/:id` - Update product (vendor only)
- `DELETE /api/products/:id` - Delete product (vendor only)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order status

### File Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images

## 🎨 Design System

### Colors
- **Primary**: Indigo (600, 700)
- **Secondary**: Purple (600)
- **Accent**: Yellow (300)
- **Success**: Green (500)
- **Warning**: Orange (500)
- **Error**: Red (500)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, various sizes
- **Body**: Regular weight, 16px base

### Components
- Consistent spacing using Tailwind's spacing scale
- Rounded corners (lg = 8px)
- Subtle shadows for depth
- Smooth transitions (300ms)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS protection
- Helmet for security headers
- Input validation and sanitization
- File upload restrictions

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Backend (Render/Railway)
1. Create new web service
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Add IP whitelist
3. Create database user
4. Update MONGODB_URI in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend**: Next.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **DevOps**: Vercel, Render, MongoDB Atlas
- **Payments**: Paystack, Flutterwave integration

## 🆘 Support

For support, email support@stylemart.ng or join our Discord community.

## 🎯 Roadmap

- [ ] Mobile apps (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Advanced search with filters
- [ ] Vendor subscription plans
- [ ] Loyalty program
- [ ] Social commerce features
- [ ] AI-powered recommendations

---

Made with ❤️ for the Nigerian e-commerce ecosystem
