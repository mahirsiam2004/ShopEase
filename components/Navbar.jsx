// frontend/components/Navbar.js - UPDATED WITH CART
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, User, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/ CartContext';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">ShopEase</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{session.user?.name || session.user?.email}</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                    <Link
                      href="/add-product"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Add Product
                    </Link>
                    <Link
                      href="/manage-products"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Manage Products
                    </Link>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        signOut();
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-black px-10">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link
              href="/cart"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>

            {session ? (
              <>
                <div className="py-2 border-t mt-2">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {session.user?.email}
                  </p>
                </div>
                <Link
                  href="/add-product"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Add Product
                </Link>
                <Link
                  href="/manage-products"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Manage Products
                </Link>
                <button
                  onClick={() => {
                    toggleMenu();
                    signOut();
                  }}
                  className="block w-full text-left py-2 text-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block py-2 text-blue-600 font-semibold"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}