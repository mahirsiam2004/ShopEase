// frontend/app/products/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowLeft, ShoppingCart, Package, Truck, Shield, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = params; // ← Direct access (Next.js 14)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
        );

        if (response.data) {
          setProduct(response.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(true);
        toast.error('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // ← Only runs when id changes (perfect)

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-16 h-16 text-purple-600" />
        </motion.div>
      </div>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Product Not Found</h1>
          <button
            onClick={() => router.push('/products')}
            className="px-8 py-4 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Success — Show Product
  return (
    <>
      <div className="container mx-auto px-6 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-3 text-purple-600 hover:text-purple-700 font-semibold text-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          Back to Products
        </button>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-8">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-auto max-h-96 object-contain mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full text-sm inline-block mb-6">
              {product.category}
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {product.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="mb-10">
              <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="space-y-4 mb-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toast.success(`${product.title} added to cart!`)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 rounded-3xl font-bold text-xl shadow-2xl flex items-center justify-center gap-4"
              >
                <ShoppingCart className="w-8 h-8" />
                Add to Cart
              </motion.button>

              <button className="w-full border-4 border-purple-600 text-purple-600 py-6 rounded-3xl font-bold text-xl hover:bg-purple-50">
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl">
                <Truck className="w-10 h-10 text-green-600" />
                <div>
                  <p className="font-bold">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                <Shield className="w-10 h-10 text-blue-600" />
                <div>
                  <p className="font-bold">Secure Payment</p>
                  <p className="text-sm text-gray-600">100% Protected</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Package className="w-8 h-8 text-purple-600" />
                Product Details
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.fullDescription}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}