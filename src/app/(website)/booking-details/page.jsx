'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { backend_url } from '@/libs/data';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/redux/userSlice';
import toast from 'react-hot-toast';

const BookingDetails = () => {
    const searchParams = useSearchParams(); 
    const propertyString = searchParams.get('property'); 
    const router = useRouter()
    const [loading,setloading] = useState(false)
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated);

    
    useEffect(() => {
      if (!user) {
        dispatch(fetchUser());
      }
    }, [dispatch, user]);

  const propertyDetails = propertyString ? JSON.parse(decodeURIComponent(propertyString)) : null;
  console.log("pr",propertyDetails)

  const initialValues = {
    title: '',
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    confirmEmail: '',
    agreeToTerms: false,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    age: Yup.number()
      .required('Age is required')
      .positive('Age must be positive')
      .integer('Age must be an integer'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref('email'), null], 'Emails must match')
      .required('Confirm email is required'),
    agreeToTerms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  });


  function formatDate(inputDate) {
    // Parse the input date
    const date = new Date(inputDate);
    
    // Get the month, day, and year
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate() + 1; // Increment the day by 1
    const year = date.getFullYear();

    // Return the formatted date
    return `${month} ${day} ${year}`;
}

  const CreateReservation = async(values)=>{
    try{
      setloading(true)
      const data = {
        AccommodationCode:propertyDetails.pcode,
        guests:propertyDetails.guests,
        checkin: propertyDetails.checkin,
        checkout: propertyDetails.checkout,
        title:values.title,
        firstName:values.firstName,
        lastName:values.lastName,
        email:values.email
      }
      const res = await axios.post(`${backend_url}/createreservation`,{
        data,
        propertyDetails,
      })
     
   
      return res.data

    }catch(error)
    {
      const message = error?.response?.data?.details?.response?.error?.message || "An error occurred. Please try again.";
      //console.log('f',error)
     toast.error(message);
    }
    finally{
      setloading(false)
    }
  }



  const handleSubmit = async(values) => {

    if(!isAuthenticated)
    {
      router.push('/?login=true')
      return
    }
    if(propertyDetails?.reference === "interhome")
    {
      const data = await CreateReservation(values)
      console.log("reser",data)

      if(data){
      await axios.post(`${backend_url}/api/user/saveReservationData`,{
        status: "Tentative",
        unit: propertyDetails?.unitId,
        source: "https://rentprivatevillas.co.uk",
        checkin: propertyDetails?.checkin,
        checkout: propertyDetails?.checkout,
        name: `${values.firstName} ${values.lastName}`,
        email: values?.email,
        propertyName: propertyDetails?.name
      })
    }
      router.push(`/booking?code=${data.success.reservationNumber}&ref=${'interhome'}`)
    }
    else if(propertyDetails?.reference === "owner")
    {

      const resp = await axios.post(`${backend_url}/api/user/saveReservationData`,{
        status: "Tentative",
        unit: propertyDetails?.unitId,
        source: "https://rentprivatevillas.co.uk",
        checkin: propertyDetails?.checkin,
        checkout: propertyDetails?.checkout,
        name: `${values.firstName} ${values.lastName}`,
        email: values?.email,
        propertyName: propertyDetails?.name
      })
      

      try{
        //setLoading(true)
       const res = await axios.post(`${backend_url}/create-checkout-session`,{
           name:propertyDetails.name,
           price: propertyDetails.price,
           ownerId: propertyDetails.ownerId,
           id: resp.data._id
       });
       window.location.replace(res.data.session.url);
       }catch(error)
       {
           console.log(error)
       }



    }
    else{
      const propertyString = encodeURIComponent(JSON.stringify(values));
      await axios.post(`${backend_url}/api/user/saveReservationData`,{
        status: "Tentative",
        unit: propertyDetails?.pcode,
        source: "https://rentprivatevillas.co.uk",
        checkin: propertyDetails?.checkin,
        checkout: propertyDetails?.checkout,
        name: `${values.firstName} ${values.lastName}`,
        email: values?.email,
        propertyName: propertyDetails?.name
      })
    
      router.push(`/booking?data=${propertyString}&checkin=${propertyDetails.checkin}&guests=${propertyDetails.guests}&checkout=${propertyDetails.checkout}&pcode=${propertyDetails.pcode}&rateId=${propertyDetails.rateId}&price=${propertyDetails.price}&ref=${'webhotelier'}`)
    }
   
  };

    
  

 
    return (
        <div>
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-12 gap-8 lg:gap-12 grid-cols-1 p-8">
                    {/* Left Section */}
                    <div className="md:col-span-7 lg:w-4/5 w-full p-4">
                        <h2 className="text-xl font-semibold mb-4">Your booking</h2>
                        <div className="flex flex-col gap-5">
                            <div className="flex border-b py-1 justify-between">
                                <span>Arrival</span>
                                <span>{formatDate(propertyDetails?.checkin)}</span>
                            </div>
                            <div className="flex border-b py-1 justify-between">
                                <span>Departure</span>
                                <span>{formatDate(propertyDetails?.checkout)}</span>
                            </div>
                            <div className="flex border-b py-1 justify-between">
                                <span>Nights</span>
                                <span>{propertyDetails?.nights}</span>
                            </div>
                            <div className="flex border-b py-1 justify-between font-semibold text-lg">
                                <span>Total rent</span>
                                <span>€{propertyDetails?.price}</span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-semibold mb-2">Choose how to pay</h3>
                            <div className="relative inline-block w-full">
                                <select className="block w-full p-3 bg-gray-100 border rounded-md shadow-sm focus:outline-none">
                                    <option>Pay in full - €{propertyDetails?.price}</option>
                                </select>
                            </div>
                            <div className="mt-4 text-lg font-semibold">€{propertyDetails?.price}</div>

                            <div className="mt-6 space-x-3">
                                <span className="text-gray-500">Pay with</span>
                                <div className="flex space-x-4">
                                    <span className="text-xl">VISA</span>
                                    <span className="text-xl">Bitcoin</span>
                                    <span className="text-xl">Wire</span>
                                    <span className="text-xl">Revolut</span>
                                    <span className="text-xl">Apple Pay</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="md:col-span-5 bg-white p-6 rounded-lg shadow-lg">
                        <img
                            
                            className="rounded-md w-full h-48 object-cover"
                            src={propertyDetails?.photo}
                            alt="Villa in Cyprus"
                        />
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">{propertyDetails?.type} in {propertyDetails?.country}</h3>
                            <p className="text-gray-500">{propertyDetails?.name}</p>
                            {/* <p className="text-gray-500">Family Beds · 1 Bath</p> */}
                            <div className="mt-2 flex items-center space-x-2">
                                <span className="text-blue-600 font-bold">5.0</span>
                                {/* <span className="text-sm text-gray-600">(7 reviews)</span> */}
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-semibold mb-2">Booking cost</h4>
                            <div className="flex justify-between">
                                <span>{propertyDetails?.bp} x {propertyDetails?.nights} nights</span>
                                <span>€{propertyDetails?.price}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total EUR</span>
                                <span>€{propertyDetails?.price}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Title</label>
                    <Field
                      as="select"
                      name="title"
                      className="w-full p-3 border rounded-md focus:outline-none"
                    >
                      <option value="">Select title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                      <option value="Dr">Dr</option>
                    </Field>
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="md:col-span-4">
                    <label className="block mb-1 font-medium">First name</label>
                    <Field
                      type="text"
                      name="firstName"
                      className="w-full p-3 border rounded-md focus:outline-none"
                      placeholder="Enter first name"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="md:col-span-4">
                    <label className="block mb-1 font-medium">Surname</label>
                    <Field
                      type="text"
                      name="lastName"
                      className="w-full p-3 border rounded-md focus:outline-none"
                      placeholder="Enter surname"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Age</label>
                    <Field
                      type="number"
                      name="age"
                      className="w-full p-3 border rounded-md focus:outline-none"
                      placeholder="Enter age"
                    />
                    <ErrorMessage name="age" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-1 font-medium">Email address</label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full p-3 border rounded-md focus:outline-none"
                      placeholder="Enter email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Confirm email address</label>
                    <Field
                      type="email"
                      name="confirmEmail"
                      className="w-full p-3 border rounded-md focus:outline-none"
                      placeholder="Confirm email"
                    />
                    <ErrorMessage name="confirmEmail" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <p className="text-base text-center font-medium">
                  Your booking confirmation email will be sent to the above address, so please ensure it is correct.
                </p>

                <div className="md:flex justify-between p-6">
                  <label className="flex gap-3 items-center">
                    <Field
                      type="checkbox"
                      name="agreeToTerms"
                      className="w-4 h-4 border rounded-md text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-base font-medium">
                      I agree with all <a href="#" className="underline">Terms and Conditions</a>
                    </span>
                  </label>
                  <ErrorMessage name="agreeToTerms" component="div" className="text-red-500 text-sm" />

                  <div className="flex justify-end py-5 items-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-black text-white px-6 py-2 rounded-md shadow-lg hover:bg-gray-700 transition"
                    >
                      {loading ? "Creating Reservation..." : "Continue"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails