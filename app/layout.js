
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/lib/ CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ShopEase - Your Modern E-Commerce Store',
  description: 'Shop the latest products with great deals',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster position="top-center" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}