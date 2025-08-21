"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/zustand";
import { Product } from "@/types/product";
import { nonFiction } from "@/data/mockNonFiction";

interface NonFictionProps {
  products?: Product[];
}

const NonFiction: React.FC<NonFictionProps> = ({ products = nonFiction }) => {
  const { addItem, items } = useCartStore();
  const [isAddingCart, setIsAddingCart] = React.useState<string | null>(null);

  const handleAddToCart = async (e: React.MouseEvent, book: Product) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingCart(book.id);

    try {
      addItem(book);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    } finally {
      setTimeout(() => setIsAddingCart(null), 500);
    }
  };

  const isInCart = (bookId: string) =>
    items.some((item) => item.product.id === bookId);
  const getCartQuantity = (bookId: string) =>
    items.find((item) => item.product.id === bookId)?.quantity || 0;

  return (
    <section className="py-16 bg-gray-50 w-screen max-w-none">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Non Fiction</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <Link
                href={`/books/${book.slug}`}
                className="block"
                aria-label={`view details for ${book.title}`}
              >
                <div className="aspect-[3/4] bg-white rounded-lg mb-4">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width="96"
                    height="120"
                    className="object-cover rounded mx-auto w-full h-full"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">
                      ₦{book.price.toLocaleString()}
                    </span>
                    {book.rating && (
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-xs text-gray-600 ml-1">
                          {book.rating}
                        </span>
                      </div>
                    )}
                  </div>
                  {book.category && (
                    <p className="text-xs text-gray-500 mt-1">
                      {book.category}
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => handleAddToCart(e, book)}
                  disabled={isAddingCart === book.id}
                  className={`w-full mt-4 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    isInCart(book.id)
                      ? "bg-gray-200 text-gray-700 border border-amber-500"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  } ${
                    isAddingCart === book.id
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isAddingCart === book.id
                    ? "Adding..."
                    : isInCart(book.id)
                    ? `In Cart (${getCartQuantity(book.id)})`
                    : "Add to cart"}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default NonFiction;
