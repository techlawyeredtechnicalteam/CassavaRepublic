"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/zustand";
// import LoadingSpinner from "@/components/LoadingSpinner";
import Header from "@/components/Header";
import { formatCardNumber, formatExpiryDate } from "@/lib/formatters";
import { useShippingValidation } from "@/utils/validateForm";

const CheckoutPage: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const {
    errors,
    setErrors,
    shippingInfo,
    setShippingInfo,
    validateShippingInfo,
    paymentInfo,
    setPaymentInfo,
    validatePaymentInfo
  } = useShippingValidation();

  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !isOrderComplete && !isProcessing) {
      router.push("/cart");
    }
  }, [items, router, isOrderComplete, isProcessing]);

  // handle shipping submit
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShippingInfo()) {
      setCurrentStep(2);
    }
  };

  //handle payment submit
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePaymentInfo()) return;
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("Payment successful, setting order complete flag...");
      // Set order complete flag BEFORE clearing cart
      setIsOrderComplete(true);
      // Clear cart after successful payment
      clearCart();
      // Redirect to success page
      router.push("/checkout/success");
    } catch (error) {
      console.error("Payment failed:", error);
      setErrors({ payment: "Payment failed. Please try again." });
      setIsOrderComplete(false);
    } finally {
      setIsProcessing(false);
    }
  };

  // Show loading if processing or order complete
  if (isProcessing || isOrderComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* <LoadingSpinner /> */}
          <p className="mt-4 text-gray-600">
            {isProcessing
              ? "Processing your payment..."
              : "Redirecting to confirmation..."}
          </p>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !isOrderComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* <LoadingSpinner /> */}
          <p className="mt-4 text-gray-600">Redirecting to cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      {/* <Header title="Checkout Page" /> */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <nav className="flex mt-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link
                  href="/cart"
                  className="text-gray-400 hover:text-gray-500"
                >
                  Cart
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
                  <span className="ml-4 text-gray-500">Checkout</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div
              className={`flex items-center ${
                currentStep >= 1 ? "text-amber-700" : "text-gray-400"
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 border-2 rounded-full flex items-center justify-center ${
                  currentStep >= 1
                    ? "border-amber-700 bg-amber-700 text-white"
                    : "border-gray-300"
                }`}
              >
                {currentStep > 1 ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">1</span>
                )}
              </div>
              <span className="ml-2 text-sm font-medium">Shipping</span>
            </div>

            <div className="flex-1 h-0.5 bg-gray-200 mx-4">
              <div
                className={`h-full ${
                  currentStep >= 2 ? "bg-amber-700" : "bg-gray-200"
                }`}
              />
            </div>

            <div
              className={`flex items-center ${
                currentStep >= 2 ? "text-amber-700" : "text-gray-400"
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 border-2 rounded-full flex items-center justify-center ${
                  currentStep >= 2
                    ? "border-amber-700 bg-amber-700 text-white"
                    : "border-gray-300"
                }`}
              >
                <span className="text-sm font-medium">2</span>
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          {/* Main Content */}
          <div className="lg:col-span-12">
            {currentStep === 1 && (
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Shipping Information
                </h2>

                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            firstName: e.target.value
                          })
                        }
                        className={`mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          shippingInfo.firstName
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            lastName: e.target.value
                          })
                        }
                        className={`mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.lastName ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value
                          })
                        }
                        className={`mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.email ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            phone: e.target.value
                          })
                        }
                        className={`mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.phone ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            address: e.target.value
                          })
                        }
                        className={`mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.address ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value
                          })
                        }
                        className={`mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.city ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            state: e.target.value
                          })
                        }
                        className={`mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.state ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.state}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            zipCode: e.target.value.replace(/\D/g, "")
                          })
                        }
                        className={`mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.zipCode ? "border-red-300" : "border-gray-300"
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.zipCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        value={shippingInfo.country}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            country: e.target.value
                          })
                        }
                        className={`mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.country ? "border-red-300" : "border-gray-300"
                        }`}
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                      {errors.country && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.country}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="sameAsShipping"
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-amber-700 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="sameAsShipping"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Billing address same as shipping
                    </label>
                  </div>

                  <button
                    type="submit"
                    aria-label="Continue to payment"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Payment Section */}
            {currentStep === 2 && (
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Payment Information
                </h2>

                <form
                  onSubmit={handlePaymentSubmit}
                  className="space-y-6"
                  autoComplete="on"
                >
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cc-number"
                      autoComplete="cc-number"
                      value={paymentInfo.cardNumber}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardNumber: formatCardNumber(e.target.value)
                        })
                      }
                      className={`mt-1 block w-full text-gray-900 border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        errors.cardNumber ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiry Date (MM/YY)
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="cc-exp"
                        autoComplete="cc-exp"
                        value={paymentInfo.expiryDate}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            expiryDate: formatExpiryDate(e.target.value)
                          })
                        }
                        className={`mt-1 block w-full text-gray-900 border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.expiryDate
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cc-csc"
                        autoComplete="cc-csc"
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 4)
                          })
                        }
                        className={`mt-1 block w-full text-gray-900 border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          errors.cvv ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cardholderName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="cardholderName"
                      name="cc-name"
                      autoComplete="cc-name"
                      value={paymentInfo.cardholderName}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardholderName: e.target.value
                        })
                      }
                      className={`mt-1 block w-full text-gray-900 border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        errors.cardholderName
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="John Smith"
                    />
                    {errors.cardholderName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.cardholderName}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Back to Shipping
                    </button>

                    <button
                      type="submit"
                      aria-label="Complete order"
                      disabled={isProcessing}
                      className={`flex-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                        isProcessing
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transition-colors"
                      }`}
                    >
                      {isProcessing ? "Please Wait...." : "Complete Order"}
                    </button>
                  </div>

                  {errors.payment && (
                    <p className="mt-4 text-sm text-red-600">
                      {errors.payment}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
