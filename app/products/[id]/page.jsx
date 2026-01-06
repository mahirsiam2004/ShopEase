"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Unwrap params for Next.js 16
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  const fetchProduct = useCallback(async () => {
    if (!productId) return;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Product not found</p>
          <button
            onClick={() => router.push("/products")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 text-black">
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-600 hover:text-blue-700 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <Image
            src={product.imageUrl || "https://via.placeholder.com/400"}
            alt={product.title}
            width={800}
            height={600}
            unoptimized
            className="w-full rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            {product.category}
          </div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.shortDescription}</p>

          <div className="mb-6">
            <span className="text-4xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.fullDescription}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={() => addToWishlist(product)}
              className="w-full border-2 border-pink-600 text-pink-600 py-4 rounded-lg font-semibold hover:bg-pink-50 transition-colors flex items-center justify-center"
            >
              <Heart className="w-5 h-5 mr-2" />
              Add to Wishlist
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Product Information</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Category: {product.category}</li>
              <li>Product ID: {product._id}</li>
              <li>Added: {new Date(product.createdAt).toLocaleDateString()}</li>
              {product.createdBy && <li>Seller: {product.createdBy}</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
