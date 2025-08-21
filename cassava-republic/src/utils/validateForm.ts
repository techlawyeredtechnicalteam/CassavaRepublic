"use client";

import { useState } from "react";
import { ShippingInfo } from "@/types/shipping";
import { PaymentInfo } from "@/types/payment";

// Define the error types
interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
  payment?: string;
}

export const useShippingValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  // shipping info Validation
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US"
  });

  // validate shipping info
  const validateShippingInfo = () => {
    const newErrors: ValidationErrors = {};

    if (!shippingInfo.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!shippingInfo.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!shippingInfo.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(shippingInfo.email))
      newErrors.email = "Email is invalid";
    if (!shippingInfo.phone.trim())
      newErrors.phone = "Phone number is required";
    if (!shippingInfo.address.trim()) newErrors.address = "Address is required";
    if (!shippingInfo.city.trim()) newErrors.city = "City is required";
    if (!shippingInfo.state.trim()) newErrors.state = "State is required";
    if (!shippingInfo.zipCode.trim())
      newErrors.zipCode = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // PAyment validation
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  // validate payment info
  const validatePaymentInfo = () => {
    const newErrors: ValidationErrors = {};

    if (!paymentInfo.cardNumber.replace(/\s/g, ""))
      newErrors.cardNumber = "Card number is required";
    else if (paymentInfo.cardNumber.replace(/\s/g, "").length < 13)
      newErrors.cardNumber = "Card number is invalid";

    if (!paymentInfo.expiryDate)
      newErrors.expiryDate = "Expiry date is required";
    else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate))
      newErrors.expiryDate = "Expiry date is invalid";

    if (!paymentInfo.cvv) newErrors.cvv = "CVV is required";
    else if (paymentInfo.cvv.length < 3) newErrors.cvv = "CVV is invalid";

    if (!paymentInfo.cardholderName.trim())
      newErrors.cardholderName = "Cardholder name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    errors,
    setErrors,
    shippingInfo,
    setShippingInfo,
    paymentInfo,
    setPaymentInfo,
    validateShippingInfo,
    validatePaymentInfo
  };
};
