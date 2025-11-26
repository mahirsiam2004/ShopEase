// frontend/app/page.js
'use client';

import Link from 'next/link';
import { ShoppingBag, Truck, Shield, HeadphonesIcon, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: ShoppingBag, title: "Wide Selection", description: "Thousands of premium products" },
    { icon: Truck, title: "Fast Delivery", description: "Same-day & express shipping" },
    { icon: Shield, title: "Secure Payment", description: "100% protected transactions" },
    { icon: HeadphonesIcon, title: "24/7 Support", description: "Always here to help you" }
  ];

  const categories = [
    { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80", count: "150+ items" },
    { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80", count: "300+ styles" },
    { name: "Home & Living", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80", count: "200+ items" },
    { name: "Fitness", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80", count: "150+ gear" }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const float = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Parallax & Animated */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        {/* Floating particles background */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              animate={{
                y: [0, -30, 0],
                x: [0, 30, -30, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm mb-6 border border-white/30"
            >
              <Sparkles className="w-5 h-5" />
              <span>New Summer Collection 2025 is here!</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Welcome to <span className="text-yellow-300">ShopEase</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-2xl leading-relaxed">
              Premium shopping experience with unbeatable prices. Discover, shop, and enjoy — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all"
                >
                  Shop Now <ArrowRight className="w-6 h-6" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/categories"
                  className="inline-block border-2 border-white px-8 py-5 rounded-xl font-semibold hover:bg-white/10 backdrop-blur transition-all"
                >
                  Explore Categories
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating icon decoration */}
        <motion.div
          animate={float}
          className="absolute bottom-10 right-10 text-white/20"
        >
          <ShoppingBag className="w-32 h-32" />
        </motion.div>
      </section>

      {/* Features Section - Animated Cards */}
      <section className="py-24 bg-gray-50" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Why Shop With Us?
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-xl">
                      <Icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                  <motion.div
                    className="absolute -bottom-4 -right-4 text-blue-100 opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <feature.icon className="w-32 h-32" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Categories Section - Hover Zoom + Overlay */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Shop by <span className="text-blue-600">Category</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/products?category=${category.name.toLowerCase()}`} className="group relative block h-80 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      {category.name}
                    </h3>
                    <p className="text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {category.count}
                    </p>
                  </div>
                  <div className="absolute inset-0 border-4 border-white/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <motion.div
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742111-a301076d9d41?w=1920')] bg-cover opacity-10"
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold mb-6"
          >
            Ready to Shop?
          </motion.h2>
          <p className="text-2xl mb-10 text-blue-100">
            Join 50,000+ happy customers today
          </p>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/products"
              className="inline-flex items-center gap-4 bg-white text-blue-600 px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-blue-400/50 transition-all"
            >
              Start Shopping Now <ArrowRight className="w-8 h-8" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}