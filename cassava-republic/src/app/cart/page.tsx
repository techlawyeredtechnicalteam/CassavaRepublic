"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/zustand";
import { FiShoppingCart } from "react-icons/fi";
// import LoadingSpinner from "@/components/LoadingSpinner";
import { formatPrice } from "@/lib/formatters";
import Header from "@/components/Header";

const CartPage: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getSubTotal,
    getItemCount
  } = useCartStore();
  const [isUpdating, setIsUpdating] = React.useState<string | null>(null);
  const [isClearing, setIsClearing] = React.useState(false);
  const router = useRouter();

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    setIsUpdating(productId);
    try {
      updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    setIsUpdating(productId);
    try {
      removeItem(productId);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setIsClearing(false);
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-lg font-medium text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Start shopping to add items to your cart.
          </p>
          <Link
            href="/books"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      {/* <Header title="Cart" /> */}
      {/* Main Cart Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Cart</h1>
          <nav className="flex mt-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link
                  href="/books"
                  className="text-gray-400 hover:text-gray-500"
                >
                  books
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-4 text-gray-500">cart</span>
                </div>
              </li>
            </ol>
          </nav>
          <p className="text-gray-600 mt-2">
            {getItemCount()} {getItemCount() === 1 ? "item" : "items"} in your
            cart
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          {/* Cart Items */}
          <section className="lg:col-span-7">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex items-center">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="ml-6 flex-1">
                        <div className="flex items-start justify-between">
                          <div className="pr-6">
                            <h3 className="text-lg font-medium text-gray-900">
                              <Link
                                href={`/product/${item.product.slug}`}
                                className="hover:text-blue-600"
                              >
                                {item.product.title}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.product.category}
                            </p>
                            <p className="text-lg font-medium text-gray-900 mt-2">
                              {formatPrice(item.product.price)}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(item.product.id)}
                            disabled={isUpdating === item.product.id}
                            className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                            aria-label={`Remove ${item.product.title} from cart`}
                          >
                            {isUpdating === item.product.id ? (
                              "Please wait"
                            ) : (
                              // <LoadingSpinner size="sm" />
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center mt-4">
                          <label
                            htmlFor={`quantity-${item.id}`}
                            className="sr-only text-gray-900"
                          >
                            Quantity for {item.product.title}
                          </label>
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              disabled={
                                item.quantity <= 1 ||
                                isUpdating === item.product.id
                              }
                              className="p-2 text-gray-900 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Decrease quantity"
                            >
                              <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>

                            <input
                              id={`quantity-${item.id}`}
                              type="number"
                              min="1"
                              max="99"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value);
                                if (newQuantity > 0 && newQuantity <= 99) {
                                  handleQuantityChange(
                                    item.product.id,
                                    newQuantity
                                  );
                                }
                              }}
                              className="w-16 text-gray-900 text-center border-0 py-2 text-sm focus:ring-0"
                              disabled={isUpdating === item.product.id}
                            />

                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              disabled={
                                item.quantity >= 99 ||
                                isUpdating === item.product.id
                              }
                              className="p-2 text-gray-900 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Increase quantity"
                            >
                              <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="ml-4 text-sm text-gray-500">
                            Subtotal:{" "}
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Clear Cart Button */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={handleClearCart}
                  disabled={isClearing}
                  className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isClearing ? (
                    <div className="flex items-center">
                      {/* <LoadingSpinner size="sm" /> */}
                      <span className="ml-2">Clearing...</span>
                    </div>
                  ) : (
                    "Clear Cart"
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Order Summary */}
          <section className="mt-16 bg-white rounded-lg shadow-sm p-6 lg:mt-0 lg:col-span-5">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Subtotal ({getTotal()} items)
                </span>
                <span className="text-gray-900">
                  {formatPrice(getSubTotal())}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">Free</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">
                  {formatPrice(getSubTotal() * 0.08)}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    {formatPrice(getSubTotal() + getSubTotal() * 0.08)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-amber-800 text-white py-3 px-4 rounded-md font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-md font-medium hover:bg-amber-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Secure Checkout</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
