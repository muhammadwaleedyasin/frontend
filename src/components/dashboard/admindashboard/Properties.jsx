'use client'
import Section from '@/components/shared/Section'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import profile from '/public/assets/profile.svg'
import axios from 'axios';
import { backend_url } from '@/libs/data';
import { LoaderComp } from '@/components/Loader';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Properties = () => {
    const [loading,setLoading] = useState(false)
    const [statusloading,setStatusLoading] = useState({})
    const [noOfUsers,setNoOfUsers] = useState('')
    const [noOfOwners,setNoOfOwners] = useState('')
    const [noOfProperties,setNoOfPropertie] = useState('')
    const [properties,setProperties] = useState([])

    const isAdminAuthenticated = useSelector((state)=>state.adminAuth.isAdminAuthenticated)
    const router = useRouter()
    if(!isAdminAuthenticated)
    {
        router.push('/admin')
    }
    const GetDetails = async()=>{
        try{
            setLoading(true)
            const res = await axios.get(`${backend_url}/api/admin/getcounts`)
            setNoOfOwners(res.data.ownerCount)
            setNoOfUsers(res.data.userCount)
            setNoOfPropertie(res.data.propertyCount)
        }catch(error)
        {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    const GetProperties = async()=>{
        try{
            setLoading(true)
            const res = await axios.get(`${backend_url}/api/admin/allproperties`)
           setProperties(res.data)
        }catch(error)
        {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    const UpdateStatus = async(status,id)=>{
        try{
            setStatusLoading(prev => ({ ...prev, [id]: status }));
            const res = await axios.post(`${backend_url}/api/admin/updatepropertystatus`,{
                newStatus:status,
                propertyId:id
            })
            toast.success(`Property ${status}`)
            GetProperties()
        }catch(error)
        {
            const errorMessage = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
           toast.error(errorMessage);
        }finally{
            setStatusLoading(prev => ({ ...prev, [id]: '' }));
        }
    }
    useEffect(()=>{
        GetDetails()
        GetProperties()
    },[])

    const ballsData = [
        { name: 'Total Properties', value: noOfProperties },
        { name: 'Total Owners', value: noOfOwners },
        { name: 'Total Users', value: noOfUsers },
    ]
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error('Invalid date:', dateString);
            return 'Invalid Date'; 
        }
    }
    const downloadCSV = () => {
        const csvRows = [];
        const headers = ['Property Name', 'Property Price', 'Country', 'City', 'Guests'];
        csvRows.push(headers.join(','));

        properties.forEach(property => {
            const row = [
                property.propertyDetails.propertyName,
                property.checkDetails.basePrice.amount,
                property.propertyDetails.country,
                property.propertyDetails.region,
                property.roomDetails.guests || 0
            ];
            csvRows.push(row.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'properties.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }


      if(loading)
      {
        return <LoaderComp/>
      }
    return (
        <div className="bg-white rounded-lg shadow-md  p-6">
            <Section>
                <div className="max-w-6xl mx-auto">
                    {/* Statistics Section */}
                    <div className='flex justify-center' >
                        <div className='bg-[#F1F1F1] shadow-md rounded-2xl xl:w-[50%] lg:w-[70%] w-full xl:px-10 px-4 py-2'>
                            <div className='flex justify-center sm:flex-nowrap flex-wrap items-center md:gap-10 gap-1 '>
                                {
                                    ballsData.map((e, i) => (
                                        <div key={i} className='flex flex-col items-center gap-2 '>
                                            <div className='bg-primary text-white p-4 h-16 w-16 flex items-center justify-center rounded-full shadow-lg' >{e.value}</div>
                                            <p className='text-primary font-medium text-xs md:text-sm'>{e.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    {/* Filter Section */}
                    <h1 className='text-primary font-medium px-2 my-6'>Filter properties</h1>
                    <div className='flex justify-center'>
                        <div className='bg-[#F1F1F1] rounded-xl flex items-center xl:w-[30%] lg:w-[45%] sm:w-[55%] w-[80%] gap-2  px-4 py-2'>
                            <input type="text" className='px-2 text-sm w-full bg-transparent outline-none' placeholder='Filter by property ID or Name' name="" id="" />
                            <IoSearchOutline className='text-[#00000080]' />
                        </div>
                    </div>

                    {/* Properties Table */}
                    <div>
                        <div className="flex justify-between py-4">
                            <h4 className="text-lg font-medium text-primary ">Newly listed properties</h4>
                            <button onClick={downloadCSV} className='bg-green-600 text-white px-5 rounded py-1'>CSV</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-black overflow-hidden">
                                <thead>
                                    <tr className="bg-primary border border-black text-white">
                                        <th className="py-2 border-r border-black px-4">ID</th>
                                        <th className="py-2 border-r border-black px-4">Property Name</th>
                                        <th className="py-2 border-r border-black px-4">Date</th>
                                        <th className="py-2 border-r border-black px-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties && properties.map((property, index) => (
                                        <tr key={index} className="border border-black">
                                            <td className="py-2 border border-black px-4 text-center">{property._id.slice(0,4)}</td>
                                            <td className="py-2 border-r border-black px-4 flex md:flex-row flex-col items-center">
                                                <Image
                                                    src={profile}
                                                    alt="Property"
                                                    className="w-10 h-10 mr-4 rounded-md"
                                                />
                                                <div>
                                                    <p className="text-sm ">{property.propertyDetails.propertyName}</p>
                                                    <p className="text-sm text-gray-500">{property.propertyDetails.address},{property.propertyDetails.country}</p>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-r border-black text-center">{formatDate(property.createdAt)}</td>
                                            <td className="py-2 px-4 text-center">
                                                {
                                                    property.status !=="pending" ? (
                                                        <button className={`${property.status === "approved" ? "bg-green-400" : "bg-red-500"} mx-2 disabled: text-white px-3 py-1 rounded-full `}>
                                                            {property.status}
                                                    </button>
                                                    ) : (
                                                        <>
                                                        <button className="bg-green-400 mx-2 text-white px-3 py-1 rounded-full hover:bg-green-600"
                                                        onClick={()=>{
                                                            UpdateStatus("approved",property._id)
                                                        }}>
                                                           {statusloading[property._id] === "approved" ? "Approving..." : "Approve"}
                                                        </button>
                                                        <button className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                                                         onClick={()=>{
                                                            UpdateStatus("rejected",property._id)
                                                        }}>
                                                            
                                                            {statusloading[property._id] === "rejected" ? "Rejecting..." : "Reject"}
                                                        </button>
                                                        </>

                                                    )
                                                }
                                               
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}

export default Properties