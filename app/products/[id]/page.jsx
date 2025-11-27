'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState(null);

  // Unwrap params for Next.js 16
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      console.log('Fetching product ID:', productId);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`);
      console.log('Product data:', response.data);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
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
            onClick={() => router.push('/products')}
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
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full rounded-lg shadow-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400';
            }}
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
            <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => toast.success('Added to cart!')}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button 
              onClick={() => toast.success('Proceeding to checkout!')}
              className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Buy Now
            </button>
          </div>
{/* information */}
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