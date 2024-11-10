'use client'

import React, { Suspense } from 'react';
import { backend_url } from '@/libs/data';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
  const router = useRouter();
  const token = searchParams.get('token');
  const user = searchParams.get('user');

  

  useEffect(() => {
    const verifyEmail = async () => {
     const us = user==="true" ? 'user' : 'owner'
     console.log("us",us)
      if (token) {
        try {
          const res = await axios.post(`${backend_url}/api/${us}/verify-email?token=${token}`);
          setMessage(res.data.message); 
        } catch (error) {
          console.error('Error verifying email:', error);
          setMessage('Failed to verify email.');
        }
      }
    };

    verifyEmail();
  }, [searchParams,user,token]); 

  const handleGoBack = () => {
    router.push('/?login=true');
  };
  

  return (
    <div className='flex flex-col items-center justify-center mx-auto h-[100vh] px-4'>
      <h1 className='text-3xl font-bold mb-4'>Email Verification</h1>
      <p className='text-lg text-center mb-8'>{message}</p>
      <button
        onClick={handleGoBack}
        className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200'
      >
        Go back to login
      </button>
    </div>
  );
};

const VerifyEmail = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmail;
