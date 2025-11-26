'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { 
  Menu, X, User, LogOut, Package, PlusCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();

  const fullName = session?.user?.name || "Guest";

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
      transition={{ type: "spring", stiffness: 120 }}
      className="
        fixed top-0 left-0 right-0 z-50 
        bg-white  /* SOLID on mobile */
        md:bg-white/70 md:backdrop-blur-xl /* transparent only on desktop */
        border-b border-gray-200 shadow-lg
      "
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MAIN NAVBAR */}
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ rotate: 360 }} 
              transition={{ duration: 0.6 }} 
              className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-md"
            >
              <Package className="w-7 h-7 text-white" />
            </motion.div>

            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              ShopEase
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-gray-700 font-medium py-2 group hover:text-blue-600 transition"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            ))}

            {/* Right User Items */}
            <div className="flex items-center gap-4">

              {/* LOGGED IN USER */}
              {session ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-md hover:shadow-lg transition"
                  >
                    <User className="w-5 h-5" />
                    <span className="truncate max-w-[120px]">{fullName}</span>
                  </motion.button>

                  {/* DROPDOWN */}
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-50"
                      >
                        {/* Header */}
                        <div className="p-5 border-b border-gray-200">
                          <p className="text-sm text-gray-600">Welcome back,</p>
                          <p className="text-xl font-bold text-gray-800 truncate">{fullName}</p>
                          <p className="text-sm text-gray-500 mt-1">{session.user?.email}</p>
                        </div>

                        {/* Actions */}
                        <div className="py-3 text-black">
                          <Link href="/add-product" className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100">
                            <PlusCircle className="w-5 h-5 text-blue-600" />
                            <span>Add Product</span>
                          </Link>

                          <Link href="/manage-products" className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100">
                            <Package className="w-5 h-5 text-purple-600" />
                            <span>Manage Products</span>
                          </Link>

                          <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="flex items-center gap-4 w-full px-6 py-3 text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="w-5 h-5" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition">
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="md:hidden p-3 rounded-full hover:bg-gray-100"
          >
            <Menu className="w-7 h-7 text-gray-800" />
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 260 }}
            className="fixed inset-0 bg-white text-gray-800 z-50 pt-24 px-8 md:hidden"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-3">
              <X className="w-8 h-8 text-gray-800" />
            </button>

            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-semibold border-b border-gray-300 pb-4"
                >
                  {link.name}
                </Link>
              ))}

              {session ? (
                <div className="pt-8 space-y-6 border-t border-gray-300">
                  <p className="text-xl font-semibold">Hello, {fullName}</p>

                  <Link href="/add-product" className="flex items-center gap-4 text-xl">
                    <PlusCircle className="w-7 h-7 text-blue-600" /> Add Product
                  </Link>

                  <Link href="/manage-products" className="flex items-center gap-4 text-xl">
                    <Package className="w-7 h-7 text-purple-600" /> Manage Products
                  </Link>

                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-4 text-red-600 text-xl"
                  >
                    <LogOut className="w-7 h-7" /> Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-full font-bold shadow-lg"
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
