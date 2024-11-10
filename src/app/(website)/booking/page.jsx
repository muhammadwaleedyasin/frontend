'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { backend_url } from "@/libs/data";
import Link from "next/link";
import { Loader } from "@/svgs";

const BookingForm = () => {
    const searchParams = useSearchParams(); 
    const propertyString = searchParams.get('data');
    const rateId = searchParams.get('rateId');
    const guests = searchParams.get('guests');
    const price = searchParams.get('price');
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const pcode = searchParams.get('pcode');
    const ref = searchParams.get('ref');
    const code = searchParams.get('code');
    const [issave,setISsave] = useState(false)
  const [reserveDetails,setReserveDetails] = useState(null)
  const router = useRouter()
const [loading,setLoading] = useState(false)
  const data = propertyString ? JSON.parse(decodeURIComponent(propertyString)) : null;
  console.log("da",code)

  const GetReservationDetails = async(code)=>{
    try{
      setLoading(true)
      const res = await axios.post(`${backend_url}/getreservation`,{
        code
      })
     setReserveDetails(res.data)


     
      //await SaveReserve();
    
    }
    catch(error)
    {
      console.log(error)
    }
    finally{
      setLoading(false)
    }

  }

  const SaveReserve = async()=>{
    try{

  await axios.post(`${backend_url}/api/user/saveReservationData`,{
    status: "Tentative",
    unit: rateId,
    source: "https://rentprivatevillas.co.uk",
    checkin: checkin,
    checkout: checkout,
    name: `${data.firstName} ${data.lastName}`
  })

  setISsave(true)

    }
    catch(error)
    {
      console.log(error)
    }
  }

  useEffect(() => {
    if (code) {
      GetReservationDetails(code);
    } 
  }, [code]);

  // useEffect(()=>{
  //   if (ref === "webhotelier" && !issave) {
  //     SaveReserve();
  //   }
  // },[issave])
  // if (ref === "webhotelier" && !issave) {
  //   SaveReserve();
  // }

console.log("dd",reserveDetails)
  const [formData, setFormData] = useState({
    payment_method: "CC",
    cardNumber: "",
    cardType: "",
    cardName: "",
    cardMonth: "",
    cardYear: "",
    cardCVV: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateCardNumber = (number) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardNumber || !validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = "Invalid card number";
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (
      !formData.cardMonth ||
      formData.cardMonth < 1 ||
      formData.cardMonth > 12
    ) {
      newErrors.cardMonth = "Invalid expiration month";
    }

    if (
      !formData.cardYear ||
      formData.cardYear < currentYear ||
      (formData.cardYear === currentYear && formData.cardMonth < currentMonth)
    ) {
      newErrors.cardYear = "Invalid expiration year";
    }

    const cvvLength = formData.cardType === "AmEx" ? 4 : 3;
    if (!formData.cardCVV || formData.cardCVV.length !== cvvLength) {
      newErrors.cardCVV = `CVV must be ${cvvLength} digits`;
    }

    if (!formData.cardName) newErrors.cardName = "Cardholder name is required";
   
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      
    }

    const bookingData = {
      checkin: checkin,
      checkout: checkout,
      rate: rateId,
      price: price,
      adults: guests,
      payment_method: formData.payment_method,
      cardNumber: formData.cardNumber,
      cardType: formData.cardType,
      cardName: formData.cardName,
      cardMonth: formData.cardMonth,
      cardYear: formData.cardYear,
      cardCVV: formData.cardCVV,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };

    try {
      const response = await axios.post(
        `${backend_url}/book/?pcode=${pcode}`,
        bookingData,
      );
      console.log("Booking successful:", response.data);
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Booking Form</h2>

      {
        ref ==='interhome' ? (
          loading ? (
            <div className="flex items-center justify-center">
            <Loader/>
            </div>
          ) : (
            reserveDetails && 
          <div className="flex flex-col gap-5">
              <Link href={reserveDetails && reserveDetails.reservation.paymentForms.paymentForm[0].fullPaymentUrl} target="_blank"
            className="w-full bg-[#81d5fa] text-black py-2 rounded-md  text-center font-medium transition"
          >
            Card Payment {reserveDetails && reserveDetails.price.amountFinalPayment}€
          </Link>
              <Link
              href={reserveDetails && reserveDetails.reservation.paymentForms.paymentForm[1].fullPaymentUrl} target="_blank"
            className="w-full bg-[#003087] text-white py-2 rounded-md transition text-center font-medium"
          >
            Paypal {reserveDetails && reserveDetails.price.amountFinalPayment}€
          </Link>
          </div>
          )
        ) : (
          <form onSubmit={handleSubmit}>
          {/* Customer Information */}
         

          {/* Payment Information */}
          <h3 className="text-xl font-semibold mb-4">Payment Information</h3>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter card number"
            />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Card Type</label>
            <select
              name="cardType"
              value={formData.cardType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="Visa">Visa</option>
              <option value="MC">MasterCard</option>
              <option value="AmEx">American Express</option>
              <option value="Disc">Discover</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-semibold">Expiration Month</label>
              <input
                type="number"
                name="cardMonth"
                value={formData.cardMonth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="MM"
                min="1"
                max="12"
              />
              {errors.cardMonth && <p className="text-red-500 text-sm">{errors.cardMonth}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold">Expiration Year</label>
              <input
                type="number"
                name="cardYear"
                value={formData.cardYear}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="YYYY"
                min="2024"
              />
              {errors.cardYear && <p className="text-red-500 text-sm">{errors.cardYear}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">CVV</label>
            <input
              type="number"
              name="cardCVV"
              value={formData.cardCVV}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter CVV"
            />
            {errors.cardCVV && <p className="text-red-500 text-sm">{errors.cardCVV}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Booking
          </button>
        </form>
        )
      }
    
      </div>
    </div>
  );
};

export default BookingForm;
