'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import google from '/public/assets/google.svg';
import { RxCross2 } from 'react-icons/rx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { backend_url } from '@/libs/data';
import { useDispatch } from 'react-redux';
import {  signup } from '@/redux/userAuthSlice';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {  ownerSignup } from '@/redux/ownerAuthSlice';
import Cookies from 'js-cookie'
import Link from 'next/link';

const SignUpModel = ({ isOpen, onClose, switchToSignIn,switchToEMail,loginTrue }) => {
    
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch()
    const pathname = usePathname()
    const router = useRouter()

    if (!isOpen) return null;

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    
    const handleGoogleSuccess = async (response) => {
        if(pathname==='/')
        {
            try {
        
                const res = await axios.post(`${backend_url}/api/user/googlesignin`, {
                    token: response.credential
                }, { withCredentials: true });
                const { token, user } = res.data;
                dispatch(signup({ token, user }));
                //localStorage.setItem("email",user.email)
                Cookies.set("email",user.email)
                toast.success('Google login successful!');
                if(loginTrue)
                {
                    router.push('/')
                    onClose()
                }
                else{
                    router.push('/dashboard/userdashboard/dashboard');
                }
            } catch (error) {
                    const errorMessage = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
                toast.error(errorMessage);
            }

        }
        else{
            try {
        
                const res = await axios.post(`${backend_url}/api/owner/googlesignin`, {
                    token: response.credential
                }, { withCredentials: true });
                const { token, owner } = res.data;
                dispatch(ownerSignup({ token, owner }));
                //localStorage.setItem("ownerEmail",owner.email)
                Cookies.set("ownerEmail",owner.email)
                toast.success('Google login successful!');
                if(loginTrue)
                    {
                        router.push('/')
                        onClose()
                    }
                    else{
                        router.push('/dashboard/userdashboard/dashboard');
                    }
            } catch (error) {
                const errorMessage = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
                toast.error(errorMessage);
            }

        }
      
    };

    const HandleSubmit = async(values)=>{
        console.log("value",values)
        if(pathname==='/')
        {
            try {
                setLoading(true) 
                const res = await axios.post(`${backend_url}/api/user/signup`, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
    
                });
                const { token, user } = res.data;
                dispatch(signup({ token, user }));
                Cookies.set("email",user.email)
               // localStorage.setItem("email",user.email)
               // toast.success('Signup Successfully');
                    switchToEMail();
                //router.push('/dashboard/userdashboard/dashboard')
               
            } catch (error) {
                const errorMessage = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
                toast.error(errorMessage);
            }
            finally{
                setLoading(false)
            }

        }
        else{
            try {
                setLoading(true) 
                const res = await axios.post(`${backend_url}/api/owner/signup`, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
    
                });
                const { token, owner } = res.data;
                dispatch(ownerSignup({ token, owner }));
                //localStorage.setItem("ownerEmail",owner.email)
                Cookies.set("ownerEmail",owner.email)
               // toast.success('Signup Successfully');
               switchToEMail()
                //router.push('/dashboard')
               
            } catch (error) {
                const errorMessage = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
            toast.error(errorMessage);
            }
            finally{
                setLoading(false)
            }

        }
     

    }

    return (
        <div className="">
            <div className="fixed inset-0 bg-black bg-opacity-50 md:px-0 px-3 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-xl w-full py-4 px-5 relative max-h-[90%] overflow-y-auto">
                    <button onClick={onClose} className="absolute top-4 right-6 text-gray-600">
                        <RxCross2 className="text-xl" />
                    </button>
                    <div className="space-y-3">
                        <h2 className="text-2xl py-1 text-center">Sign Up</h2>
                            {/* <Image src={google} alt="Google" width={20} height={20} />
                            <span className="">Continue with Google</span> */}
                            <div className='flex items-center justify-center'>
                            <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => {
                                        console.log('Login Failed');
                                        toast.error('Login failed');
                                    }}
                                    logo_alignment='center'
                                    size='large'
                                    width='3000'
                                    shape='square'
                                    text='signin with Google'
                                />
                                </div>
                     
                    </div>
                    <div className="text-center py-1">Or</div>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={HandleSubmit}
                    >
                        {({ setFieldTouched, handleChange, handleBlur, touched, errors }) => (
                            <Form >
                                <div className="grid md:grid-cols-12 gap-3 items-center grid-cols-1">
                                    <div className="col-span-12 md:col-span-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-base p-1 font-medium">
                                                First Name
                                            </label>
                                            <Field
                                                name="firstName"
                                                type="text"
                                                placeholder="First name"
                                                className={`w-full p-4 bg-[#C7C7C7] bg-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0890FF] ${touched.firstName && errors.firstName ? 'border-red-500' : ''}`}
                                            />
                                            {touched.firstName && errors.firstName && (
                                                <div className="text-red-500 text-sm pt-1">
                                                    {errors.firstName}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div>
                                            <label htmlFor="lastName" className="block text-base p-1 font-medium">
                                                Last Name
                                            </label>
                                            <Field
                                                name="lastName"
                                                type="text"
                                                placeholder="Last name"
                                                className={`w-full p-4 bg-[#C7C7C7] bg-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0890FF] ${touched.lastName && errors.lastName ? 'border-red-500' : ''}`}
                                            />
                                            {touched.lastName && errors.lastName && (
                                                <div className="text-red-500 text-sm pt-1">
                                                    {errors.lastName}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div>
                                            <label htmlFor="email" className="block text-base p-1 font-medium">
                                                Email
                                            </label>
                                            <Field
                                                name="email"
                                                type="email"
                                                placeholder="Enter email address"
                                                className={`w-full p-4 bg-[#C7C7C7] bg-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0890FF] ${touched.email && errors.email ? 'border-red-500' : ''}`}
                                            />
                                            {touched.email && errors.email && (
                                                <div className="text-red-500 text-sm pt-1">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div>
                                            <label htmlFor="password" className="block text-base p-1 font-medium">
                                                Password
                                            </label>
                                            <Field
                                                name="password"
                                                type="password"
                                                placeholder="Enter Password"
                                                className={`w-full p-4 bg-[#C7C7C7] bg-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0890FF] ${touched.password && errors.password ? 'border-red-500' : ''}`}
                                            />
                                            {touched.password && errors.password && (
                                                <div className="text-red-500 text-sm pt-1">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-base p-1 font-medium">
                                                Confirm Password
                                            </label>
                                            <Field
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="Confirm Password"
                                                className={`w-full p-4 bg-[#C7C7C7] bg-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0890FF] ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : ''}`}
                                            />
                                            {touched.confirmPassword && errors.confirmPassword && (
                                                <div className="text-red-500 text-sm pt-1">
                                                    {errors.confirmPassword}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <button disabled={loading} type="submit" className="w-full bg-primary text-white py-4 rounded-lg hover:bg-blue-600">
                                            {loading ? "Signing Up..." : "Sign Up"}
                                        </button>
                                    </div>
                                    <div className="text-center col-span-12 text-[#8D8D8D] ">
                                        <span className='text-[#8D8D8D]'>Already a member?</span>
                                        <button type='button' onClick={switchToSignIn} className="text-primary hover:underline">Sign in</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {
                    pathname === '/list-your-property' && (
                        <div className=' w-full flex flex-col'>
                        <p className=' block text-base p-1 font-medium mt-3'>Previous Owner login</p>
                        <Link href="https://www.24hourkeys.com/owner/index.php/" className="w-full bg-primary text-center text-white py-4 rounded-lg hover:bg-blue-600">
                                      Owner Login
                        </Link>
                    </div>
                    )
                   }
                </div>
                
            </div>
        </div>
    );
};

export default SignUpModel;
