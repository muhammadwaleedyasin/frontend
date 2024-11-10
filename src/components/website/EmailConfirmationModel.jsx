'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { RxCross2 } from 'react-icons/rx';
import { backend_url } from '@/libs/data';
import axios from 'axios';
import checkMail from '@/svgs/check-mail.png';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

const OTPVerificationModel = ({ isOpen, onClose }) => {
    const [otp, setOtp] = useState(new Array(5).fill(''));
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Automatically focus on the next input
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handlePaste = (e) => {
        // Get pasted content and remove non-numeric characters
        const pastedOtp = e.clipboardData.getData('Text').replace(/\D/g, '');

        // Fill OTP fields with the pasted content (only if it's 5 digits long)
        if (pastedOtp.length === 5) {
            setOtp(pastedOtp.split(''));
            // Automatically attempt verification if all fields are filled
           // handleVerifyOtp();
        }
    };

    const handleVerifyOtp = async () => {
        const email = pathname === "/list-your-property" ? Cookies.get('ownerEmail') : Cookies.get('email');
        const link = pathname === "/list-your-property" ? "api/owner" : "api/user"
        const otpCode = otp.join('');

        if (otpCode.length < 5) {
            toast.error("Please enter a valid 5-digit OTP");
            return;
        }

        try {
            setLoading(true);

            await axios.post(`${backend_url}/${link}/verify-otp`, { email, otp: otpCode });
            toast.success('OTP Verified Successfully');
            onClose();  // Close modal on success
        } catch (error) {
            const errorMessage = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 relative">
                    {/* <button onClick={onClose} className="absolute top-4 right-6 text-gray-600">
                        <RxCross2 className="text-xl" />
                    </button> */}
                    <div className="flex flex-col items-center space-y-4">
                        {/* Top Image */}
                        <Image src={checkMail} alt="OTP Verification Icon" width={60} height={60} />

                        {/* Text Content */}
                        <h2 className="text-2xl text-center">Enter the OTP</h2>
                        <p className="text-center text-sm text-gray-700">
                            We sent a 5-digit OTP to your email. Please enter it below to verify your email address.
                        </p>

                        {/* OTP Input Fields */}
                        <div className="flex space-x-2">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={data}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace' && otp[index] === '') {
                                            if (e.target.previousSibling) {
                                                e.target.previousSibling.focus();
                                            }
                                        }
                                    }}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onPaste={handlePaste}
                                />
                            ))}
                        </div>

                        {/* Verify Button */}
                        <button
                            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            onClick={handleVerifyOtp}
                        >
                            {loading ? "Verifying ..." : "Verify OTP"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerificationModel;
