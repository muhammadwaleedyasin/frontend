'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import google from '/public/assets/google.svg';
import { RxCross2 } from 'react-icons/rx';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { backend_url } from '@/libs/data';
import { login } from '@/redux/userAuthSlice';
import { useDispatch } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { ownerLogin } from '@/redux/ownerAuthSlice';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const SignInModel = ({ isOpen, onClose, switchToSignUp,loginTrue }) => {
    
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();

    if (!isOpen) return null;

    const handleGoogleSuccess = async (response) => {
        try {
            const url = pathname === '/' ? '/api/user/googlesignin' : '/api/owner/googlesignin';
            const res = await axios.post(`${backend_url}${url}`, {
                token: response.credential
            }, { withCredentials: true });

            const { token, user, owner } = res.data;
            if (pathname === '/') {
                dispatch(login({ token, user }));
                //localStorage.setItem("email", user.email);
                Cookies.set("email",user.email)
            } else {
                dispatch(ownerLogin({ token, owner }));
                //localStorage.setItem("ownerEmail", owner.email);
                Cookies.set("ownerEmail",owner.email)

            }

            toast.success('Google login successful!');
            if(loginTrue)
            {
                router.push('/')
                onClose()
            }
            else{
                router.push(pathname === '/' ? '/dashboard/userdashboard/dashboard' : '/dashboard');
            }
        } catch (error) {
            console.error('Google login error:', error.response?.data?.error || error.message);
            toast.error('Error logging in with Google.');
        }
    };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const url = pathname === '/' ? '/api/user/login' : '/api/owner/login';
            const res = await axios.post(`${backend_url}${url}`, {
                email: values.email,
                password: values.password
            });

            const { token, user, owner } = res.data;
            if (pathname === '/') {
                dispatch(login({ token, user }));
               // localStorage.setItem("email", user.email);
                Cookies.set("email",user.email)

            } else {
                dispatch(ownerLogin({ token, owner }));
                Cookies.set("ownerEmail",owner.email)

               // localStorage.setItem("ownerEmail", owner.email);
            }

            toast.success('Logged in successfully!');
            if(loginTrue)
            {
                router.push('/')
                onClose()
            }
            else{
                router.push(pathname === '/' ? '/dashboard/userdashboard/dashboard' : '/dashboard');
            }
        } catch (error) {
            const errorMessage = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="fixed inset-0 bg-black bg-opacity-50 flex md:px-0 px-3 justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative">
                    <button onClick={onClose} className="absolute top-4 right-6 text-gray-600">
                        <RxCross2 className="text-xl" />
                    </button>
                    <div className="space-y-3">
                        <h2 className="text-2xl py-2 text-center">Sign In</h2>
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
                                text='Sign in with Google'
                            />
                        </div>
                    </div>
                    <div className="text-center py-2">Or</div>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ touched, errors }) => (
                            <Form>
                                <div className="space-y-2 ">
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
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm pt-1" />
                                    </div>
                                    <div className="py-2">
                                        <label htmlFor="password" className="block text-base p-1 font-medium">
                                            Password
                                        </label>
                                        <Field
                                            name="password"
                                            type="password"
                                            placeholder="Enter Password"
                                            className={`w-full p-4 bg-[#C7C7C7] bg-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0890FF] ${touched.password && errors.password ? 'border-red-500' : ''}`}
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm pt-1" />
                                        <div className="mt-2">
                                            <a href="#" className="text-primary hover:underline text-sm">Forgot password?</a>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full bg-primary text-white py-4 rounded-lg hover:bg-blue-600">
                                        {loading ? "Logging in..." : "Log in"}
                                    </button>
                                    <div className="text-center pt-5 text-[#8D8D8D] ">
                                        <span className='text-[#8D8D8D]'>Not a member?</span>
                                        <button onClick={switchToSignUp} className="text-primary hover:underline">Sign up</button>
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

export default SignInModel;
