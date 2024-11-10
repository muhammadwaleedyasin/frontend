'use client'

import { GoogleLogin } from '@react-oauth/google';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { backend_url } from '@/libs/data';
import { login } from '@/redux/adminAuth';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function Page () {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const res = await axios.post(`${backend_url}/api/admin/adminlogin`, {
                email: values.email,
                password: values.password
            });

            const { token } = res.data;
            dispatch(login({token}))
            toast.success('Logged in successfully!');
            router.push('/dashboard/admin/properties');
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
    <div>
         <div className="mx-auto flex items-center justify-center py-10">
                <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8">
                    <div className="space-y-3">
                        <h2 className="text-2xl py-2 text-center">Sign In</h2>
                        {/* <div className='flex items-center justify-center'>
                            <GoogleLogin
                               // onSuccess={handleGoogleSuccess}
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
                        </div> */}
                    </div>
                    {/* <div className="text-center py-2">Or</div> */}
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
                                    
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
        </div>
    </div>
  )
}
