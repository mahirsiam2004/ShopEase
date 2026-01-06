'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/lib/WishlistContext';
import { Trash2, Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Heart className="w-16 h-16 mx-auto text-pink-400 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Your Wishlist is Empty</h1>
        <p className="text-gray-600 mb-6">Browse products and add your favorites.</p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Wishlist</h1>
        <button
          onClick={clearWishlist}
          className="text-pink-600 hover:text-pink-700 font-semibold"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
            <div className="relative">
              <Image
                src={product.imageUrl || 'https://via.placeholder.com/400'}
                alt={product.title}
                width={600}
                height={400}
                unoptimized
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow"
                title="Remove"
              >
                <Trash2 className="w-5 h-5 text-pink-600" />
              </button>
            </div>
            <h3 className="mt-4 font-semibold line-clamp-2">{product.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{product.shortDescription}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold text-blue-600">${product.price.toFixed(2)}</span>
              <Link
                href={`/products/${product._id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
