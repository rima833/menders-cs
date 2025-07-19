-- Insert admin users with bcrypt hashed passwords
-- Password for all users: "password123" (you should change these in production)
INSERT INTO users (email, password_hash, role, name, phone) VALUES
('admin@menderscleaning.ng', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'Admin User', '+234-800-MENDERS'),
('manager@menderscleaning.ng', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'manager', 'Manager User', '+234-800-MANAGER'),
('cleaner@menderscleaning.ng', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'cleaner', 'Cleaner User', '+234-800-CLEANER'),
('john.cleaner@menderscleaning.ng', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'cleaner', 'John Cleaner', '+234-801-111-1111'),
('mary.cleaner@menderscleaning.ng', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'cleaner', 'Mary Cleaner', '+234-802-222-2222');

-- Insert services
INSERT INTO services (name, description, base_price, category) VALUES
('Regular Home Cleaning', 'Standard cleaning for residential properties including dusting, vacuuming, mopping, and bathroom cleaning', 15000.00, 'residential'),
('Deep Home Cleaning', 'Comprehensive deep cleaning service including all regular cleaning plus detailed cleaning of appliances, baseboards, and hard-to-reach areas', 25000.00, 'residential'),
('Office Cleaning', 'Professional office cleaning service including desk cleaning, floor maintenance, restroom sanitization, and trash removal', 20000.00, 'commercial'),
('Post-Construction Cleanup', 'Specialized post-construction cleaning including debris removal, dust cleaning, and final detailing', 35000.00, 'specialized'),
('Event Cleanup', 'Pre and post-event cleaning services for parties, weddings, and corporate events', 30000.00, 'specialized'),
('Move-in/Move-out Cleaning', 'Complete cleaning service for properties during relocation', 28000.00, 'specialized'),
('Window Cleaning', 'Professional window cleaning service for residential and commercial properties', 12000.00, 'specialized');

-- Insert sample bookings
INSERT INTO bookings (customer_name, customer_email, customer_phone, customer_address, service_type, property_size, frequency, preferred_date, preferred_time, total_amount, status, special_requests) VALUES
('John Doe', 'john@example.com', '+234-801-234-5678', '123 Victoria Island, Lagos State', 'Regular Home Cleaning', 'medium', 'weekly', '2024-01-25', 'morning', 15000.00, 'confirmed', 'Please focus on the kitchen and bathrooms'),
('Jane Smith', 'jane@example.com', '+234-802-345-6789', '456 Wuse 2, Abuja FCT', 'Deep Home Cleaning', 'large', 'one-time', '2024-01-27', 'afternoon', 25000.00, 'pending', 'Need cleaning before hosting guests'),
('Mike Johnson', 'mike@company.com', '+234-803-456-7890', '789 Ikeja GRA, Lagos State', 'Office Cleaning', 'large', 'weekly', '2024-01-26', 'evening', 20000.00, 'confirmed', 'After business hours only'),
('Sarah Williams', 'sarah@example.com', '+234-804-567-8901', '321 Maitama, Abuja FCT', 'Event Cleanup', 'medium', 'one-time', '2024-01-28', 'morning', 30000.00, 'in_progress', 'Post-wedding cleanup'),
('David Brown', 'david@example.com', '+234-805-678-9012', '654 Lekki Phase 1, Lagos State', 'Move-in/Move-out Cleaning', 'small', 'one-time', '2024-01-29', 'afternoon', 28000.00, 'pending', 'Moving out cleaning');

-- Insert gallery images
INSERT INTO gallery_images (title, before_image_url, after_image_url, description, service_type, is_featured) VALUES
('Living Room Deep Clean Transformation', '/placeholder.svg?height=300&width=400&text=Messy+Living+Room', '/placeholder.svg?height=300&width=400&text=Clean+Living+Room', 'Complete living room deep clean with furniture arrangement and carpet cleaning', 'Deep Home Cleaning', true),
('Office Space Professional Cleaning', '/placeholder.svg?height=300&width=400&text=Cluttered+Office', '/placeholder.svg?height=300&width=400&text=Clean+Office', 'Professional office cleaning service with desk organization and floor polishing', 'Office Cleaning', true),
('Kitchen Deep Cleaning Service', '/placeholder.svg?height=300&width=400&text=Dirty+Kitchen', '/placeholder.svg?height=300&width=400&text=Spotless+Kitchen', 'Complete kitchen deep clean including appliances, cabinets, and countertops', 'Deep Home Cleaning', true),
('Bathroom Sanitization', '/placeholder.svg?height=300&width=400&text=Dirty+Bathroom', '/placeholder.svg?height=300&width=400&text=Clean+Bathroom', 'Professional bathroom cleaning and sanitization service', 'Regular Home Cleaning', false),
('Post-Construction Site Cleanup', '/placeholder.svg?height=300&width=400&text=Construction+Mess', '/placeholder.svg?height=300&width=400&text=Clean+Space', 'Complete post-construction cleanup and debris removal', 'Post-Construction Cleanup', true),
('Event Venue Restoration', '/placeholder.svg?height=300&width=400&text=After+Party+Mess', '/placeholder.svg?height=300&width=400&text=Clean+Venue', 'Post-event cleanup and venue restoration service', 'Event Cleanup', false);

-- Insert site settings
INSERT INTO site_settings (key, value, description) VALUES
('business_name', 'Menders Cleaning Services', 'Business name displayed on the website'),
('business_phone', '+234-800-MENDERS', 'Primary business phone number'),
('business_email', 'info@menderscleaning.ng', 'Primary business email address'),
('business_address', 'Lagos & Abuja, Nigeria', 'Primary business address'),
('service_areas', 'Lagos, Abuja, Port Harcourt', 'Areas where services are provided'),
('emergency_contact', '+234-800-EMERGENCY', 'Emergency contact number'),
('business_hours', 'Monday - Saturday: 8:00 AM - 6:00 PM, Sunday: 10:00 AM - 4:00 PM', 'Business operating hours'),
('minimum_booking_amount', '10000', 'Minimum booking amount in Naira'),
('cancellation_policy', '24 hours notice required for cancellations', 'Booking cancellation policy'),
('payment_methods', 'Cash, Bank Transfer, Card Payment', 'Accepted payment methods');
