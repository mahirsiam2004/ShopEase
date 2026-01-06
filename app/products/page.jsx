"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Search, Filter, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/WishlistContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("Relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = useCallback(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (sortOption === "Price: Low to High") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortOption === "Newest") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setCurrentPage(1);
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortOption]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`
      );
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-16 h-16 text-purple-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Our Products
          </h1>
          <p className="text-xl opacity-90">
            Premium quality. Unbeatable prices.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl text-black">
        {/* Search + Filter + Sort */}
        <div className="mb-10 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative text-black">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all text-lg"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all text-lg font-medium"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all text-lg font-medium"
            >
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8 text-center">
          <p className="text-2xl font-bold text-gray-800">
            {filteredProducts.length} Product
            {filteredProducts.length !== 1 && "s"} Found
          </p>
        </div>

        {/* PERFECT GRID - ALL CARDS SAME SIZE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full border border-gray-100"
              >
                {/* Fixed Height Image */}
                <div className="relative overflow-hidden bg-gray-50">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width={800}
                    height={400}
                    unoptimized
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <button
                    onClick={() => addToWishlist(product)}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow hover:scale-105 transition"
                    title="Add to wishlist"
                  >
                    <Heart className="w-5 h-5 text-pink-600" />
                  </button>
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content - Takes remaining space */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 min-h-14">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                    {product.shortDescription}
                  </p>

                  {/* Price + Button - Always at bottom, perfectly aligned */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                      ${product.price.toFixed(2)}
                    </span>

                    <Link
                      href={`/products/${product._id}`}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Pagination */}
        {filteredProducts.length > pageSize && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Prev
            </button>
            <div className="flex gap-2">
              {Array.from({
                length: Math.ceil(filteredProducts.length / pageSize),
              }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(Math.ceil(filteredProducts.length / pageSize), p + 1)
                )
              }
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">No results</div>
            <p className="text-2xl text-gray-600">
              Try a different search or category
            </p>
          </div>
        )}
      </div>
    </>
  );
}
