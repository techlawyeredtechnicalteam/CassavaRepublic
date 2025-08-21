"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/zustand";
import { Product } from "@/types/product";
import Header from "./Header";

interface BookGridProps {
  books: Product[];
  title?: string;
}

const BookGrid: React.FC<BookGridProps> = ({ books, title = "FICTION" }) => {
  const { addItem, items, removeItem } = useCartStore();
  const [isAddingCart, setIsAddingCart] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = useState("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter and sort books
  const filteredBooks = books
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (book) => book.price >= priceRange.min && book.price <= priceRange.max
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        default:
          return 0;
      }
    });

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

  const handleRemoveFromCart = (e: React.MouseEvent, bookId: string) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(bookId);
  };

  const isInCart = (bookId: string) =>
    items.some((item) => item.product.id === bookId);

  const getCartQuantity = (bookId: string) =>
    items.find((item) => item.product.id === bookId)?.quantity || 0;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden bg-white p-3 rounded-lg shadow-sm mb-4"
          >
            <span className="text-sm font-medium">Filters & Cart</span>
          </button>

          {/* Sidebar */}
          <div
            className={`
            lg:w-80 w-full space-y-6
            ${sidebarOpen ? "block" : "hidden lg:block"}
          `}
          >
            {/* Section Title */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
            </div>

            {/* Product Search */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3">PRODUCT SEARCH</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-3 py-1 rounded text-xs">
                  🔍
                </button>
              </div>
            </div>

            {/* Filter by Price */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3">
                FILTER BY PRICE
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2 text-sm">
                  <span>
                    Price: ₦{priceRange.min.toLocaleString()} — ₦
                    {priceRange.max.toLocaleString()}
                  </span>
                </div>
                <input
                  aria-label="Price Range"
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      max: Number(e.target.value)
                    }))
                  }
                  className="w-full"
                />
                <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm hover:bg-orange-600 transition-colors">
                  FILTER
                </button>
              </div>
            </div>

            {/* Cart */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3">CART</h3>

              {items.length === 0 ? (
                <p className="text-gray-500 text-sm">Your cart is empty</p>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        width={40}
                        height={50}
                        className="rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {item.product.title}
                        </p>
                        <p className="text-gray-600">
                          {item.quantity} × ₦
                          {item.product.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) =>
                          handleRemoveFromCart(e, item.product.id)
                        }
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Subtotal:</span>
                      <span className="font-bold">
                        ₦{subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <button className="w-full bg-orange-500 text-white py-2 rounded text-sm hover:bg-orange-600 transition-colors">
                        VIEW CART
                      </button>
                      <button className="w-full bg-gray-800 text-white py-2 rounded text-sm hover:bg-gray-900 transition-colors">
                        CHECKOUT
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recently Viewed Products */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3">
                RECENTLY VIEWED PRODUCTS
              </h3>
              <div className="space-y-3">
                {books.slice(0, 3).map((book) => (
                  <div
                    key={book.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={40}
                      height={50}
                      className="rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {book.title}
                      </p>
                      <p className="text-orange-500 font-medium">
                        ₦{book.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results header */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-gray-600">
                  Showing 1–{Math.min(12, filteredBooks.length)} of{" "}
                  {filteredBooks.length} results
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-gray-600">
                    Sort by
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="title">Title A-Z</option>
                    <option value="author">Author A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Books Grid */}
            {filteredBooks.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No books found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 group"
                  >
                    <Link
                      href={`/books/${book.slug}`}
                      className="block"
                      aria-label={`View details for ${book.title}`}
                    >
                      <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <Image
                          src={book.image}
                          alt={book.title}
                          width={300}
                          height={400}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600">{book.author}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-orange-600">
                            ₦{book.price.toLocaleString()}
                          </span>
                          {book.rating && (
                            <div className="flex items-center">
                              <span className="text-yellow-400 text-sm">★</span>
                              <span className="text-xs text-gray-600 ml-1">
                                {book.rating}
                              </span>
                            </div>
                          )}
                        </div>

                        {book.category && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                            {book.category}
                          </span>
                        )}
                      </div>
                    </Link>

                    <button
                      onClick={(e) => handleAddToCart(e, book)}
                      disabled={isAddingCart === book.id}
                      className={`w-full mt-4 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                        isInCart(book.id)
                          ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                          : "bg-orange-500 hover:bg-orange-600 text-white"
                      } ${
                        isAddingCart === book.id
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:shadow-md"
                      }`}
                    >
                      {isAddingCart === book.id
                        ? "Adding..."
                        : isInCart(book.id)
                        ? `In Cart (${getCartQuantity(book.id)})`
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination placeholder */}
            {filteredBooks.length > 12 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <button className="px-3 py-2 rounded border border-gray-300 text-sm hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-2 rounded bg-orange-500 text-white text-sm">
                    1
                  </button>
                  <button className="px-3 py-2 rounded border border-gray-300 text-sm hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-2 rounded border border-gray-300 text-sm hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookGrid;

// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useCartStore } from "@/store/zustand";
// import { Product } from "@/types/product";

// interface BooksGridProps {
//   books: Product[];
// }

// const BooksGrid: React.FC<BooksGridProps> = ({ books }) => {
//   const { addItem, items } = useCartStore();
//   const [isAddingCart, setIsAddingCart] = React.useState<string | null>(null);

//   const handleAddToCart = async (e: React.MouseEvent, book: Product) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsAddingCart(book.id);

//     try {
//       addItem(book);
//     } catch (error) {
//       console.error("Failed to add item to cart:", error);
//     } finally {
//       setTimeout(() => setIsAddingCart(null), 500);
//     }
//   };

//   const isInCart = (bookId: string) =>
//     items.some((item) => item.product.id === bookId);
//   const getCartQuantity = (bookId: string) =>
//     items.find((item) => item.product.id === bookId)?.quantity || 0;

//   if (books.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
//         <p className="text-gray-600">Check back later for new additions to our collection.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {books.map((book) => (
//         <div
//           key={book.id}
//           className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
//         >
//           <Link
//             href={`/books/${book.slug}`}
//             className="block"
//             aria-label={`View details for ${book.title}`}
//           >
//             <div className="aspect-[3/4] bg-white rounded-lg mb-4 overflow-hidden">
//               <Image
//                 src={book.image}
//                 alt={book.title}
//                 width={300}
//                 height={400}
//                 className="object-cover rounded mx-auto w-full h-full hover:scale-105 transition-transform duration-300"
//               />
//             </div>

//             <div className="space-y-2">
//               <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
//                 {book.title}
//               </h3>
//               <p className="text-sm text-gray-600">{book.author}</p>

//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-bold text-gray-900">
//                   ₦{book.price.toLocaleString()}
//                 </span>
//                 {book.rating && (
//                   <div className="flex items-center">
//                     <span className="text-yellow-400">★</span>
//                     <span className="text-xs text-gray-600 ml-1">
//                       {book.rating}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {book.category && (
//                 <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
//                   {book.category}
//                 </p>
//               )}
//             </div>
//           </Link>

//           <button
//             onClick={(e) => handleAddToCart(e, book)}
//             disabled={isAddingCart === book.id}
//             className={`w-full mt-4 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//               isInCart(book.id)
//                 ? "bg-teal-100 text-teal-700 border border-teal-300"
//                 : "bg-gray-100 hover:bg-gray-200 text-gray-800"
//             } ${
//               isAddingCart === book.id
//                 ? "opacity-50 cursor-not-allowed"
//                 : ""
//             }`}
//           >
//             {isAddingCart === book.id
//               ? "Adding..."
//               : isInCart(book.id)
//               ? `In Cart (${getCartQuantity(book.id)})`
//               : "Add to Cart"}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BooksGrid;
