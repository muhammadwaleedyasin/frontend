'use client'

import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaFacebookMessenger, FaInstagram, FaRegCopyright } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Footer = () => {
    const router = useRouter()
    const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated);

    return (
        <>
            <div className="bg-primary">
                <div className='md:w-5/6 px-5 mx-auto'>
                    <div className="py-8">
                        <h1 className='text-white font-bold text-3xl '>RentPrivateVillas</h1>
                    </div>
                    <div className="py-4 grid grid-cols-2 gap-4 md:justify-between md:grid-cols-4 w-full">
                        <div className="flex text-white flex-col   space-y-4 ">
                            <div className="">
                                <h1 className='font-semibold text-xl'>ABOUT</h1>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Link href='/aboutus'>About us</Link>
                                <Link href='/'>Journal</Link>
                                <Link href='/'>Rental T&C</Link>
                                <Link href='/'>Reviews</Link>
                                <Link href='/'>FAQ’s</Link>
                            </div>
                        </div>
                        <div className=" text-white    space-y-4 ">
                            <div className="">
                                <h1 className='font-semibold text-xl'>HOST</h1>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Link href='/'>Host your villa</Link>
                                <Link href='/'>Host your hotel</Link>
                                <Link href='/'>Host your apartment</Link>
                                <p onClick={()=> router.push('/list-your-property?login=true')} className=' cursor-pointer'>Owner login</p>
                            </div>
                        </div>
                        <div className="flex text-white flex-col  space-y-4 items-start">
                            <div className="">
                                <h1 className='font-semibold text-xl'>SUPPORT</h1>
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <Link href={`${isAuthenticated ? "/dashboard/userdashboard/rentproperties" : "/?login=true"}`}>My Reservation</Link>
                                <Link href='/'>Enquiry Form</Link>
                                <Link href='/'>Host your apartement</Link>
                            </div>
                        </div>
                        <div className="flex text-white flex-col space-y-4 ">
                            <div className="">
                                <h1 className='font-semibold text-xl'>Follow Us On</h1>
                            </div>
                            <div className="flex gap-4  items-center">
                                <Link href='/' className='flex gap-2'><FaFacebook size={28} /></Link>
                                <Link href='/' className='flex gap-2 bg-white h-8 w-8 items-center justify-center rounded-full'><FaInstagram size={20} className='text-primary '/></Link>
                                <Link href='/' className='flex gap-2'><FaFacebookMessenger size={28} /></Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:justify-end md:items-end">
                        <div className="">
                            <p className="text-2xl text-white ">
                                Join our newsletter
                            </p>
                            <form className="mt-2.5 sm:flex sm:max-w-md relative">
                                <input
                                    type="email"
                                    required
                                    placeholder="Email Address"
                                    autoComplete="email"
                                    className="text-sm rounded-full bg-[#FFFFFF80]  py-4 px-4 w-[72vw] md:w-[24vw] outline-none shadow-sm border-0 placeholder:text-white sm:leading-6"
                                />
                                <Button
                                    label='SUBMIT' style='!text-white absolute right-[5.7rem] md:right-2 py-2 top-[7px] md:top-[8px] md:top-2 '
                                />
                            </form>
                        </div>
                    </div>
                </div>

                <div className="border-b w-5/6 md:w-4/12 pt-8 mx-auto border-white  py-2"></div>
                <div className="text-center py-3">
                    <p className='text-white text-sm md:text-base justify-center flex items-center gap-2 font-semibold'><FaRegCopyright /> 2024.rentprivatevillas, All rights reserved</p>
                </div>
            </div>
        </>
    )
}

export default Footer