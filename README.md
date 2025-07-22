# Menders Cleaning Services - Professional Cleaning App

*Built with Next.js, TypeScript, Tailwind CSS, and Supabase*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/rimagodwin700-9899s-projects/v0-high-performance-cleaning-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/F9tqZE61iVy)

## 🏠 Overview

Menders Cleaning Services is a comprehensive professional cleaning service application serving Lagos, Abuja, and across Nigeria. The app provides both a customer-facing website and a powerful admin dashboard for managing bookings, users, pricing, and business operations.

## ✨ Features

### 🌐 Customer Features
- **Modern Landing Page** - Responsive design with dark/light theme support
- **Service Portfolio** - Comprehensive cleaning services (Residential, Commercial, Post-Construction, Events)
- **Pricing Calculator** - Real-time quote calculation with customizable options
- **Booking System** - Easy scheduling with availability checking
- **Before/After Gallery** - Visual showcase of cleaning results
- **Customer Testimonials** - Social proof and reviews
- **Contact Forms** - Multiple ways to get in touch

### 🔧 Admin Dashboard Features
- **Dashboard Overview** - Key metrics and performance statistics
- **Booking Management** - View, manage, and track all bookings
- **User Management** - Admin, manager, and cleaner user roles
- **Pricing Management** - Dynamic pricing configuration
- **Image Management** - Upload and manage before/after gallery images
- **Site Settings** - Configure business information and settings

### 🛠 Technical Features
- **Next.js 14** - Latest React framework with app router
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Modern, responsive styling
- **Supabase Integration** - Real-time database and authentication
- **Component Library** - Radix UI + shadcn/ui components
- **Form Management** - React Hook Form integration
- **Theme Support** - Dark/light mode toggle
- **Mobile Responsive** - Optimized for all device sizes

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- pnpm (recommended) or npm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd menders-cleaning-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your actual Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   
   Create the following tables in your Supabase project:

   ```sql
   -- Users table
   CREATE TABLE users (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     password_hash TEXT NOT NULL,
     role TEXT CHECK (role IN ('admin', 'manager', 'cleaner')) DEFAULT 'cleaner',
     name TEXT NOT NULL,
     phone TEXT,
     is_active BOOLEAN DEFAULT true,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Services table
   CREATE TABLE services (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     description TEXT,
     base_price DECIMAL(10,2) NOT NULL,
     category TEXT NOT NULL,
     is_active BOOLEAN DEFAULT true,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Bookings table
   CREATE TABLE bookings (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     customer_name TEXT NOT NULL,
     customer_email TEXT NOT NULL,
     customer_phone TEXT NOT NULL,
     customer_address TEXT NOT NULL,
     service_type TEXT NOT NULL,
     property_size TEXT NOT NULL,
     frequency TEXT NOT NULL,
     preferred_date DATE NOT NULL,
     preferred_time TIME NOT NULL,
     total_amount DECIMAL(10,2),
     status TEXT CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
     assigned_cleaner_id UUID REFERENCES users(id),
     special_requests TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Gallery images table
   CREATE TABLE gallery_images (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     before_image_url TEXT NOT NULL,
     after_image_url TEXT NOT NULL,
     description TEXT,
     service_type TEXT,
     is_featured BOOLEAN DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Site settings table
   CREATE TABLE site_settings (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     key TEXT UNIQUE NOT NULL,
     value TEXT NOT NULL,
     description TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Customer Interface
- **Home Page**: Browse services and get quotes
- **Pricing Calculator**: Get instant pricing estimates
- **Booking**: Schedule cleaning services
- **Gallery**: View before/after transformations

### Admin Dashboard
Access the admin dashboard at `/admin`:
- Create admin user in Supabase users table
- Login with admin credentials
- Manage all aspects of the business

## 🏗 Project Structure

```
menders-cleaning-app/
├── app/                    # Next.js app router
│   ├── admin/             # Admin dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── modals/           # Modal components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── public/              # Static assets
└── styles/              # Additional styles
```

## 🎨 Customization

### Styling
- **Themes**: Modify `tailwind.config.ts` for custom colors and themes
- **Components**: Update component styles in `components/ui/`
- **Global Styles**: Modify `app/globals.css`

### Business Logic
- **Pricing**: Update pricing logic in `components/pricing-calculator.tsx`
- **Services**: Modify available services in relevant components
- **Locations**: Update supported cities in booking system

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
This Next.js app can be deployed on any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🛡 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | No |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For support and questions:
- 📧 Email: info@menderscleaningservices.com
- 📱 Phone: +234-XXX-XXX-XXXX
- 🌐 Website: [Your deployed URL]

## 🔗 Links

- **Live Demo**: [Your Vercel deployment URL]
- **v0.dev Project**: https://v0.dev/chat/projects/F9tqZE61iVy
- **Vercel Dashboard**: https://vercel.com/rimagodwin700-9899s-projects/v0-high-performance-cleaning-app

---

*Built with ❤️ for professional cleaning services in Nigeria*
