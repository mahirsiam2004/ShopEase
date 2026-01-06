// app/about/page.js
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles,
  Truck,
  ShieldCheck,
  Heart,
  Globe,
  Users,
  Star,
  ArrowRight,
  Package, // ← THIS WAS MISSING!
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: Heart },
    { number: "5K+", label: "Products Available", icon: Package }, // ← Now works!
    { number: "50+", label: "Team Members", icon: Users },
    { number: "24/7", label: "Support Active", icon: ShieldCheck },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-24">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-3xl"></div>

        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full opacity-30"
              animate={{
                y: [0, -100, 0],
                x: [0, 50, -50, 0],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 pt-40"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              About ShopEase
            </motion.h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 leading-relaxed">
              We’re on a mission to make premium shopping simple, joyful, and
              accessible to everyone — one click at a time.
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="mt-12 inline-block"
          >
            <Sparkles className="w-20 h-20 text-yellow-300 opacity-80" />
          </motion.div>
        </div>
      </section>

      {/* Our Story - Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              From a dream to your favorite shopping destination
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-600 to-purple-600 h-full hidden lg:block rounded-full"></div>

            {[
              {
                year: "2023",
                title: "The Beginning",
                desc: "ShopEase was born with a vision to simplify online shopping.",
                icon: Sparkles,
              },
              {
                year: "2024",
                title: "10,000+ Customers",
                desc: "Reached our first major milestone with happy shoppers worldwide.",
                icon: Users,
              },
              {
                year: "2025",
                title: "Expanded Categories",
                desc: "Launched Fashion, Home, Fitness & more — becoming a true one-stop shop.",
                icon: Globe,
              },
              {
                year: "Today",
                title: "Your Trusted Partner",
                desc: "Continuing to grow, innovate, and put customers first — every single day.",
                icon: Heart,
              },
            ].map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3 }}
                  className={`flex items-center mb-12 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8`}
                >
                  <div className="flex-1 text-right lg:text-left">
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl"
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>
                  </div>

                  <div className="flex-1 hidden lg:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            <motion.div
              variants={item}
              whileHover={{ y: -10 }}
              className="group relative bg-gradient-to-br from-blue-500 to-blue-700 text-white p-10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <Globe className="w-16 h-16 mb-6 text-blue-200" />
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg leading-relaxed text-blue-100">
                To deliver a seamless, joyful shopping experience with premium
                products, lightning-fast delivery, and customer service that
                truly cares.
              </p>
              <ArrowRight className="w-8 h-8 mt-6 opacity-70 group-hover:translate-x-4 transition-transform" />
            </motion.div>

            <motion.div
              variants={item}
              whileHover={{ y: -10 }}
              className="group relative bg-gradient-to-br from-purple-500 to-pink-600 text-white p-10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <Star className="w-16 h-16 mb-6 text-purple-200" />
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg leading-relaxed text-purple-100">
                To become the world’s most loved e-commerce platform — where
                quality meets affordability and every customer feels valued.
              </p>
              <ArrowRight className="w-8 h-8 mt-6 opacity-70 group-hover:translate-x-4 transition-transform" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            By the Numbers
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-10"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.1 }}
                  className="text-center group"
                >
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
                    <Icon className="w-12 h-12" />
                  </div>
                  <div className="text-5xl font-extrabold mb-2">
                    {stat.number}
                  </div>
                  <p className="text-lg opacity-90">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-50 text-center text-gray-700">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Shop with Confidence?
          </motion.h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands who trust ShopEase for quality, speed, and care.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-blue-500/50 transition-all"
            >
              Start Shopping Now <ArrowRight className="w-7 h-7" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
