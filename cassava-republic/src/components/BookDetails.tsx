"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/zustand";
import Header from "./Header";

interface BookDetailsProps {
  product: Product;
  relatedProducts?: Product[];
}

const BookDetails: React.FC<BookDetailsProps> = ({
  product,
  relatedProducts = []
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [isAddingCart, setIsAddingCart] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("DESCRIPTION");
  const { addItem } = useCartStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Book not found
          </h2>
          <p className="text-gray-600 mb-8">
            The book you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/books"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Browse All Books
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAddingCart(true);
    try {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    } catch (error) {
      console.error("Error adding items to cart:", error);
    } finally {
      setIsAddingCart(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/books" className="text-gray-500 hover:text-gray-700">
                Books
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{product.title}</li>
          </ol>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-96 bg-white rounded-lg overflow-hidden shadow-md">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              {product.category && (
                <div className="text-sm">
                  <span className="text-gray-500">FICTION</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-gray-500">CONTEMPORARY FICTION</span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="text-3xl font-bold text-gray-900">
                ₦{product.price.toLocaleString()}.00
              </div>

              {/* Description Preview */}
              <p className="text-gray-600 leading-relaxed">
                {product.description ||
                  `Discover "${product.title}" by ${product.author}, a captivating work that showcases the rich storytelling tradition. This book offers readers an immersive experience into compelling narratives and thought-provoking themes that resonate with contemporary readers.`}
              </p>

              {/* Author */}
              <p className="text-gray-600">
                <span className="font-medium">Author:</span> {product.author}
              </p>

              {/* Available */}
              <p className="text-green-600 font-medium">
                Available on bookshelf
              </p>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    aria-label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value) || 1)
                    }
                    className="w-16 text-center py-2 border-l border-r border-gray-300 focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingCart}
                  className="bg-orange-500 text-white py-2 px-8 rounded font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingCart ? "Adding..." : "ADD TO CART"}
                </button>
              </div>

              {/* Social Share Icons */}
              <div className="flex items-center space-x-3 pt-4">
                <span className="text-sm text-gray-600">Share:</span>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <span className="text-xs font-bold">f</span>
                  </button>
                  <button className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <span className="text-xs font-bold">t</span>
                  </button>
                  <button className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                    <span className="text-xs font-bold">g</span>
                  </button>
                  <button className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <span className="text-xs font-bold">in</span>
                  </button>
                  <button className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                    <span className="text-xs font-bold">@</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Tab Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("DESCRIPTION")}
                className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "DESCRIPTION"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                DESCRIPTION
              </button>
              <button
                onClick={() => setActiveTab("REVIEWS")}
                className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "REVIEWS"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                REVIEWS
              </button>
            </nav>
          </div>

          {activeTab === "DESCRIPTION" && (
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                {product.description ||
                  `This compelling narrative explores themes of determination, breaking barriers, and following one&apos;s dreams against all odds. Through vivid storytelling and rich character development, readers are taken on a journey that celebrates the pioneering spirit and the courage to pursue seemingly impossible dreams.`}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {product.description ||
                  `This compelling narrative explores themes of determination, breaking barriers, and following one&apos;s dreams against all odds. Through vivid storytelling and rich character development, readers are taken on a journey that celebrates the pioneering spirit and the courage to pursue seemingly impossible dreams.`}
              </p>
            </div>
          )}

          {activeTab === "REVIEWS" && (
            <div className="space-y-4">
              <p className="text-gray-600">
                No reviews yet. Be the first to review this book!
              </p>
              <button className="bg-orange-500 text-white px-6 py-2 rounded font-medium hover:bg-orange-600 transition-colors">
                Write a Review
              </button>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              RELATED PRODUCTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <div key={relatedProduct.id} className="group">
                  <Link href={`/books/${relatedProduct.id}`}>
                    <div className="aspect-[3/4] relative bg-gray-100 rounded-lg overflow-hidden mb-4 group-hover:shadow-lg transition-shadow">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {relatedProduct.title}
                    </h3>
                    {relatedProduct.rating && (
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < relatedProduct.rating!
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">
                        ₦{relatedProduct.price.toLocaleString()}.00
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;

// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Product } from "@/types/product";
// import { useCartStore } from "@/store/zustand";

// interface BookDetailsProps {
//   product: Product;
// }

// const BookDetails: React.FC<BookDetailsProps> = ({ product }) => {
//   const [quantity, setQuantity] = React.useState(1);
//   const [isAddingCart, setIsAddingCart] = React.useState(false);
//   const { addItem } = useCartStore();

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h2>
//           <p className="text-gray-600 mb-8">The book you're looking for doesn't exist.</p>
//           <Link
//             href="/books"
//             className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
//           >
//             Browse All Books
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleAddToCart = async () => {
//     setIsAddingCart(true);
//     try {
//       for (let i = 0; i < quantity; i++) {
//         addItem(product);
//       }
//     } catch (error) {
//       console.error("Error adding items to cart:", error);
//     } finally {
//       setIsAddingCart(false);
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Breadcrumb */}
//         <nav className="flex" aria-label="Breadcrumb">
//           <ol className="flex items-center space-x-4">
//             <li>
//               <Link
//                 href="/"
//                 className="text-gray-400 hover:text-gray-500 text-sm"
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <div className="flex items-center">
//                 <svg
//                   className="flex-shrink-0 h-4 w-4 text-gray-300"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <Link
//                   href="/books"
//                   className="ml-4 text-sm text-gray-500 hover:text-gray-700"
//                 >
//                   Books
//                 </Link>
//               </div>
//             </li>
//           </ol>
//         </nav>

//         {/* Book Details */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12">
//           {/* Product Image */}
//           <div className="space-y-4">
//             <div className="aspect-square relative bg-white rounded-lg overflow-hidden shadow-sm">
//               <Image
//                 src={product.image}
//                 alt={product.title}
//                 fill
//                 className="object-cover"
//                 priority
//               />
//               {/* Zoom Icon */}
//               <button
//                 type="button"
//                 aria-label="Zoom"
//                 className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
//               >
//                 {/* <FaMagnifyingGlass className="h-5 w-5 text-gray-500" /> */}
//               </button>
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             {/* Category */}
//             {product.category && (
//               <div>
//                 <Link
//                   href={`/books?category=${product.category}`}
//                   className="text-blue-500 hover:text-blue-600 text-sm font-medium"
//                 >
//                   {product.category}
//                 </Link>
//               </div>
//             )}

//             {/* Book Title and Author */}
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 {product.title}
//               </h1>
//               <p className="text-lg text-gray-600 mb-4">by {product.author}</p>

//               {/* Rating */}
//               {product.rating && (
//                 <div className="flex items-center mb-4">
//                   <div className="flex items-center">
//                     {[...Array(5)].map((_, i) => (
//                       <span
//                         key={i}
//                         className={`text-lg ${
//                           i < product.rating! ? "text-yellow-400" : "text-gray-300"
//                         }`}
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <span className="ml-2 text-sm text-gray-600">
//                     ({product.rating}/5)
//                   </span>
//                 </div>
//               )}

//               {/* Price */}
//               <div className="flex items-center space-x-2 mb-6">
//                 <span className="text-2xl font-bold text-gray-900">
//                   ₦{product.price.toLocaleString()}
//                 </span>
//                 <span className="text-sm text-gray-500">+ Free Shipping</span>
//               </div>

//               {/* Description */}
//               <p className="text-gray-600 leading-relaxed mb-6">
//                 {product.description ||
//                   `Discover "${product.title}" by ${product.author}, a captivating work that showcases the rich storytelling tradition of African literature. This book offers readers an immersive experience into compelling narratives and thought-provoking themes.`}
//               </p>
//             </div>

//             {/* Quantity and Add to Cart */}
//             <div className="space-y-4">
//               <div className="flex items-center space-x-4">
//                 {/* Quantity Selector */}
//                 <div className="flex items-center border border-gray-300 rounded-md">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-900"
//                     disabled={quantity <= 1}
//                   >
//                     -
//                   </button>
//                   <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[60px] text-center text-gray-800">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={() => setQuantity(quantity + 1)}
//                     className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-900"
//                     // disabled={quantity}
//                   >
//                     +
//                   </button>
//                 </div>

//                 {/* Add to Cart Button */}
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={isAddingCart}
//                   className="flex-1 bg-teal-500 text-white py-3 px-6 rounded-md font-medium hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isAddingCart ? (
//                     <span className="flex items-center justify-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Adding...
//                     </span>
//                   ) : (
//                     `Add ${quantity} to Cart`
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Category Link */}
//             {product.category && (
//               <div className="border-t pt-4">
//                 <p className="text-sm text-gray-600">
//                   Category:{" "}
//                   <Link
//                     href={`/books?category=${product.category}`}
//                     className="text-blue-500 hover:text-blue-600 font-medium"
//                   >
//                     {product.category}
//                   </Link>
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default BookDetails;
