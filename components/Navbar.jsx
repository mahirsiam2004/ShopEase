// frontend/components/Navbar.js
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, User, ShoppingBag, LogOut, Package, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-18">

          {/* Logo - Gradient & Animated */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg"
              >
                <ShoppingBag className="w-7 h-7 text-white" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
              />
            </div>
            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              ShopEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-5 py-6 text-gray-700 font-medium transition-all duration-300 hover:text-blue-600 group"
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform" />
              </Link>
            ))}

            {/* User Section */}
            <div className="ml-6 relative">
              {session ? (
                <div className="flex items-center gap-4">
                  {/* Cart Icon (Example - you can make it dynamic) */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-3 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingBag className="w-6 h-6 text-gray-700" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </motion.button>

                  {/* User Dropdown */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      <User className="w-5 h-5" />
                      <span className="hidden lg:inline">
                        {session.user?.name?.split(' ')[0] || 'Account'}
                      </span>
                    </motion.button>

                    <AnimatePresence>
                      {showDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden"
                        >
                          <div className="p-5 border-b border-gray-200">
                            <p className="text-sm text-gray-600">Signed in as</p>
                            <p className="font-semibold text-gray-800 truncate">
                              {session.user?.email}
                            </p>
                          </div>

                          <div className="py-2 text-black">
                            <Link
                              href="/add-product"
                              onClick={() => setShowDropdown(false)}
                              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition-colors"
                            >
                              <PlusCircle className="w-5 h-5 text-blue-600" />
                              <span>Add Product</span>
                            </Link>
                            <Link
                              href="/manage-products"
                              onClick={() => setShowDropdown(false)}
                              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition-colors"
                            >
                              <Package className="w-5 h-5 text-purple-600" />
                              <span>Manage Products</span>
                            </Link>
                            <button
                              onClick={() => {
                                setShowDropdown(false);
                                signOut();
                              }}
                              className="flex items-center gap-3 w-full px-5 py-3 hover:bg-red-50 text-red-600 transition-colors"
                            >
                              <LogOut className="w-5 h-5" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/login"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Slide In */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700 z-40 pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-8 text-white text-xl font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-yellow-300 transition-colors py-2 border-b border-white/20"
                >
                  {link.name}
                </Link>
              ))}

              {session ? (
                <>
                  <div className="pt-6 border-t border-white/30">
                    <p className="text-sm opacity-80">Signed in as</p>
                    <p className="font-bold text-lg">{session.user?.email}</p>
                  </div>
                  <Link href="/add-product" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-3">
                    <PlusCircle className="w-6 h-6" /> Add Product
                  </Link>
                  <Link href="/manage-products" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-3">
                    <Package className="w-6 h-6" /> Manage Products
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="flex items-center gap-3 py-3 text-red-300"
                  >
                    <LogOut className="w-6 h-6" /> Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="mt-10 inline-block bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg shadow-2xl"
                >
                  Login Now
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}