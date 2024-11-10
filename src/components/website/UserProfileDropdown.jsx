'use client'

import { ownerLogout } from '@/redux/ownerAuthSlice';
import { logout } from '@/redux/userAuthSlice';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaTh, FaGift, FaRegUserCircle } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import { useDispatch } from 'react-redux';

const UserProfileDropdown = ({data}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const dispatch = useDispatch()
    const pathname = usePathname()
    const router = useRouter()
    const [isClient, setIsClient] = useState(false);
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        setIsClient(true);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        setIsOpen(false); 
    }, [pathname]);

    useEffect(() => {
        console.log("Data changed in UserProfileDropdown:", data);
    }, [data]);
 
    const HandleLogout = ()=>{
       if(pathname==='/')
       {
        dispatch(logout())
        router.push('/')
       }
       else{
        dispatch(ownerLogout())
        router.push('/')
       }
       window.location.reload();

    }

    const HandleDashboard = ()=>{
        if(pathname=='/'){
            router.push('/dashboard/userdashboard/dashboard')
        }
        else{
            router.push('/dashboard')
        }
    }

    if (!isClient) {
        return null; 
    }
 


    return (
        <div className="relative">
            <div ref={buttonRef}>
                <button 
                    className='text-white flex border-2 border-white rounded-full gap-2 py-1 px-2' 
                    onClick={toggleDropdown}
                >
                    <FaRegUserCircle size={20}/> <IoMdMenu size={20}/>
                </button>
            </div>
            {isOpen && (
                <div 
                    ref={dropdownRef} 
                    className="absolute md:right-0 gap-2 md:left-auto left-0 flex flex-col item-start  mt-2 w-56 z-10 bg-white rounded-lg shadow-lg p-4"
                >
                    <div className="flex items-center justify-start">
                        <FaUserCircle className="h-8 w-8 pr-2 text-black" />
                        <div className="flex flex-col">
                            <p className="font-medium text-base text-gray-800"> {data?.firstName || 'Name'} {data?.lastName}</p>
                            <p className="text-sm text-gray-500">ID: 210387</p>
                        </div>
                    </div>
                    <div className="flex items-center mb-4 cursor-pointer" onClick={()=>{HandleDashboard()}} >
                        <FaTh className="text-xl text-gray-700" />
                        <p className="ml-3 text-gray-700">Dashboard</p>
                    </div>
                    {/* <div className="flex items-center mb-4 cursor-pointer">
                        <FaGift className="text-xl text-gray-700" />
                        <p className="ml-3 text-gray-700">Redeem</p>
                    </div> */}
                    <button className="w-full py-2 bg-black text-white rounded-lg" onClick={()=>{HandleLogout()}}>Log out</button>
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown;
