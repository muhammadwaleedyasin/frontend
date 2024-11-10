'use client'
import { LoaderComp } from '@/components/Loader';
import Section from '@/components/shared/Section';
import { backend_url } from '@/libs/data';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const Owner = () => {
    const [loading,setLoading] = useState(false)
    const [owners,setOwners] = useState([])
    const [deleteloading,setDeleteLoading] = useState({})
    const [filter, setFilter] = useState('');


    const GetOwners = async()=>{
        try{
            setLoading(true)
            const res = await axios.get(`${backend_url}/api/admin/getallowners`)
           setOwners(res.data)
        }catch(error)
        {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const HandleDeleteUser = async (id)=>{
        try{
            setDeleteLoading((prev) => ({ ...prev, [id]: true }));
             await axios.delete(`${backend_url}/api/admin/deleteowner/${id}`)
            toast.success("User Deleted Successfully")
            GetUsers()
        }catch(error)
        {
            const errorMessage = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
          toast.error(errorMessage);
        }finally{
            setDeleteLoading((prev) => ({ ...prev, [id]: false }));
        }

    }
    useEffect(()=>{

        GetOwners()
    },[
    ])

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredOwners = owners.filter(owner => 
        owner._id.includes(filter) || 
        owner.firstName.toLowerCase().includes(filter.toLowerCase()) || 
        owner.email.toLowerCase().includes(filter.toLowerCase())
    );

    if(loading)
    {
        return <LoaderComp/>
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <Section>
                <div className="max-w-6xl mx-auto">
                    {/* Filter Section */}
                    <h1 className='text-primary font-medium px-2 my-6'>Filter properties</h1>
                    <div className='flex justify-center mb-6'>
                        <div className='bg-[#F1F1F1] rounded-xl flex items-center xl:w-[30%] lg:w-[45%] sm:w-[55%] w-[80%] gap-2 px-4 py-2'>
                            <input
                                type="text"
                                className='px-2 text-sm w-full bg-transparent outline-none'
                                placeholder='Filter by property ID or Name'
                                name=""
                                id=""
                                value={filter}
                                onChange={handleFilterChange}
                            />
                            <IoSearchOutline className='text-[#00000080]' />
                        </div>
                    </div>

                    {/* Properties Table */}
                    <div>
                        <h4 className="text-lg font-medium text-primary mb-4">Newly listed properties</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full  bg-white border border-black  overflow-hidden">
                                <thead>
                                    <tr className="bg-primary border border-black text-white">
                                        <th className="py-2 px-4 border-r border-black text-left">ID</th>
                                        <th className="py-2 px-4 border-r border-black text-left">Username</th>
                                        <th className="py-2 px-4 border-r border-black text-left">Email</th>
                                        <th className="py-2 px-4 border-r border-black text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOwners.map((owner, index) => (
                                        <tr key={index} className="border border-black ">
                                            <td className="py-2 border-r border-black px-4 text-center">{owner._id.slice(-4)}</td>
                                            <td className="py-2 border-r border-black px-4">{owner.firstName}</td>
                                            <td className="py-2 border-r border-black px-4">{owner.email}</td>
                                            <td className="py-2 border-r border-black px-4 text-center">
                                                <button className="bg-primary text-white px-4 py-1 rounded-full hover:bg-blue-600"
                                                 onClick={()=>{
                                                    HandleDeleteUser(owner._id)
                                                 }} >
                                                     {deleteloading[owner._id] ? "Deleting..." : "Delete"}
                                                </button>
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
    );
};

export default Owner;
