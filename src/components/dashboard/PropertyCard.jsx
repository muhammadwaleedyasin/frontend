'use client'

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import img1 from '/public/assets/propertyImg.png';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useRouter } from 'next/navigation';
import Pagination from '../shared/Pagination';
import Link from 'next/link';
import { backend_url } from '@/libs/data';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwner } from '@/redux/ownerSlice';
import { LoaderComp } from '../Loader';
import toast from 'react-hot-toast';


 


// const propertyData = [
//     {
//         id: 1,
//         name: "Protaras Holiday Villa 100",
//         image: img1,
//         villaNumber: "Villa #182432",
//         location: "Protaras, Cyprus",
//         status: "Live"
//     },
//     {
//         id: 2,
//         name: "Pernera Holiday Villa 012",
//         image: img1,
//         villaNumber: "Villa #182297",
//         location: "Protaras, Cyprus",
//         status: "Live"
//     },
//     {
//         id: 3,
//         name: "Pernera Holiday Villa 012",
//         image: img1,
//         villaNumber: "Villa #182297",
//         location: "Protaras, Cyprus",
//         status: "Live"
//     },
//     {
//         id: 4,
//         name: "Pernera Holiday Villa 012",
//         image: img1,
//         villaNumber: "Villa #182297",
//         location: "Protaras, Cyprus",
//         status: "Live"
//     },
//     {
//         id: 5,
//         name: "Pernera Holiday Villa 012",
//         image: img1,
//         villaNumber: "Villa #182297",
//         location: "Protaras, Cyprus",
//         status: "Live"
//     },
// ];

const itemsPerPage = 10;
const PropertyCard = () => {
    const [properties,setProperties] = useState([])
    const router = useRouter();
    const [openOptionId, setOpenOptionId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const dropdownRef = useRef(null);
    const [loading,setLoading] = useState(false)
    const owner = useSelector((state) => state.owner.owner);
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [toggleLoading,setToggleLoading] = useState(false)


    const GetProperties = async(id)=>{
        try{
            setLoading(true)
            const res = await axios.get(`${backend_url}/api/owner/getproperties/${id}`)
           setProperties(res.data)
        }catch(error)
        {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    const handleToggleStatus = async(id)=>{
        try{
            setToggleLoading(true)
             await axios.put(`${backend_url}/api/user/toggleAvailability/${id}`)
             const res = await axios.get(`${backend_url}/api/owner/getproperties/${owner._id}`)
           setProperties(res.data)
        }catch(error)
        {
            console.log(error)
        }finally{
            setToggleLoading(false)
        }
    }
    useEffect(()=>{
        if(owner)
        {
            GetProperties(owner._id)
        }
    },[owner])

    

    // Calculate the start and end index for the items on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = properties.slice(startIndex, endIndex);

    const pageCount = Math.ceil(properties.length / itemsPerPage); // Total number of pages

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (propertyId) => {
        try{
            setDeleteLoading(true)
            await axios.delete(`${backend_url}/api/owner/deleteproperty/${propertyId}`)
            toast.success("Property Deleted Successfully")
            GetProperties(owner._id)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setDeleteLoading(false)
        }
    };

    const handleUpdate = (propertyId) => {
        router.push(`/property-details-form?propertyId=${propertyId}&calender=true`);
    };

   
    const handleOptionsClick = (propertyId) => {
        setOpenOptionId(openOptionId === propertyId ? null : propertyId);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenOptionId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if(loading)
    {
        return <LoaderComp/>
    }

    return (
        <div className="flex flex-col p-4 md:p-8 overflow-hidden relative">
            <div className="flex-grow overflow-y-auto ">
                {paginatedData.map((property) => (
                    <div key={property.id} className=" flex md:flex-row flex-col items-center md:items-start justify-between p-4 bg-white rounded-lg shadow-md mb-4">
                        
                        <div className="md:flex relative items-center md:space-y-0 space-y-3">
                        <p className={`${property?.available===true ? " font-semibold shadow-sm p-1 rounded-full text-green-500 bg-white" : "font-semibold shadow-sm p-1 rounded-full text-black bg-white"} absolute top-2 left-2`}>{property?.available === true ? "Live" : "Not Live"}</p>
                        <img 
                            src={property.placeImages[0]} 
                            alt={property.propertyDetails.propertyName} 
                            width={1920} 
                            height={1280} 
                            className="md:w-48 md:h-32 object-cover w-full rounded-lg" 
                            />

                            <div className="ml-4">
                                <h2 className="text-lg font-semibold">{property.propertyDetails.propertyName} </h2>
                                <p className="text-gray-600">{property.villaNumber}</p>
                                <p className="text-gray-600">{property.propertyDetails.address}</p>
                                <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-full">
                                    {property.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex md:flex-col md:items-start items-center gap-2 pt-6 space-y-2">
                            <Link href={`/property-details-form?propertyId=${property._id}`} className='w-full'>
                                <button className="px-4 py-2 w-full bg-primary text-white rounded hover:bg-blue-600">
                                    Edit
                                </button>
                            </Link>
                           
                            <div className=" inline-block text-left" >
                                <button
                                    onClick={() => handleOptionsClick(property._id)}
                                    className="inline-flex items-center gap-2 justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                                >
                                    Options
                                    {openOptionId === property._id ? (
                                        <IoIosArrowUp />
                                    ) : (
                                        <IoIosArrowDown />
                                    )}
                                </button>
                                {openOptionId === property._id && (
                                    <div ref={dropdownRef} className="absolute right-10 mt-2 w-44 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                                        <div className="p-1">
                                            <button
                                                onClick={() => handleDelete(property._id)}
                                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                              {deleteLoading ? "Deleting..." :  "Delete Property"}
                                            </button>
                                            <button
                                                onClick={() => handleUpdate(property._id)}
                                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Update Calendar
                                            </button>
                                            {
                                                property.status === 'approved' &&(
                                                    <button
                                                    onClick={() => handleToggleStatus(property._id)}
                                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {toggleLoading ? "Updating..." : "Toggle Status"}
                                                </button>
                                                )
                                            }
                                          
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex-none">
                <Pagination
                    pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default PropertyCard;
