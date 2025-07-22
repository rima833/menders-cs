const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const message = {
      from: `${process.env.FROM_NAME || 'StyleMart'} <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    const info = await transporter.sendMail(message);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

// Email verification template
const getEmailVerificationTemplate = (userName, verificationLink) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Verify Your Email - StyleMart</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>StyleMart</h1>
                <p>Multi-Vendor Marketplace</p>
            </div>
            <div class="content">
                <h2>Welcome to StyleMart, ${userName}!</h2>
                <p>Thank you for joining our marketplace. To complete your registration, please verify your email address by clicking the button below:</p>
                <p style="text-align: center;">
                    <a href="${verificationLink}" class="button">Verify Email Address</a>
                </p>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #666;">${verificationLink}</p>
                <p>This verification link will expire in 24 hours.</p>
                <p>If you didn't create an account with us, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 StyleMart. All rights reserved.</p>
                <p>Nigeria's Premier Multi-Vendor Marketplace</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Password reset template
const getPasswordResetTemplate = (userName, resetLink) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Reset Your Password - StyleMart</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>StyleMart</h1>
                <p>Multi-Vendor Marketplace</p>
            </div>
            <div class="content">
                <h2>Password Reset Request</h2>
                <p>Hello ${userName},</p>
                <p>You requested to reset your password for your StyleMart account. Click the button below to reset your password:</p>
                <p style="text-align: center;">
                    <a href="${resetLink}" class="button">Reset Password</a>
                </p>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #666;">${resetLink}</p>
                <p>This password reset link will expire in 1 hour for security reasons.</p>
                <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 StyleMart. All rights reserved.</p>
                <p>Nigeria's Premier Multi-Vendor Marketplace</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Order confirmation template
const getOrderConfirmationTemplate = (userName, orderNumber, orderTotal, orderItems) => {
  const itemsHtml = orderItems.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₦${item.price.toLocaleString()}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Order Confirmation - StyleMart</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .order-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .order-table th { background: #f0f0f0; padding: 12px; text-align: left; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>StyleMart</h1>
                <p>Order Confirmation</p>
            </div>
            <div class="content">
                <h2>Thank you for your order, ${userName}!</h2>
                <p>Your order has been confirmed and is being processed.</p>
                <p><strong>Order Number:</strong> ${orderNumber}</p>
                
                <table class="order-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th style="text-align: center;">Quantity</th>
                            <th style="text-align: right;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                        <tr style="font-weight: bold; background: #f0f0f0;">
                            <td colspan="2" style="padding: 15px;">Total</td>
                            <td style="padding: 15px; text-align: right;">₦${orderTotal.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
                
                <p>We'll send you shipping confirmation and tracking information once your order ships.</p>
                <p>Thank you for shopping with StyleMart!</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 StyleMart. All rights reserved.</p>
                <p>Nigeria's Premier Multi-Vendor Marketplace</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

module.exports = {
  sendEmail,
  getEmailVerificationTemplate,
  getPasswordResetTemplate,
  getOrderConfirmationTemplate
};