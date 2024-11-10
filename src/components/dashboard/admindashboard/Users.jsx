'use client'
import { LoaderComp } from '@/components/Loader';
import Section from '@/components/shared/Section';
import { backend_url } from '@/libs/data';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoSearchOutline } from 'react-icons/io5';

const Users = () => {
    const [loading,setLoading] = useState(false)
    const [deleteloading,setDeleteLoading] = useState({})
    const [users,setUsers] = useState([])
    const [filter, setFilter] = useState('');


    const GetUsers = async()=>{
        try{
            setLoading(true)
            const res = await axios.get(`${backend_url}/api/admin/getAllUsers`)
           setUsers(res.data)
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
             await axios.delete(`${backend_url}/api/admin/deleteuser/${id}`)
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

        GetUsers()
    },[
    ])
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredUsers = users.filter(user => 
        user._id.includes(filter) || 
        user.firstName.toLowerCase().includes(filter.toLowerCase()) || 
        user.email.toLowerCase().includes(filter.toLowerCase())
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
                                    {filteredUsers.map((user, index) => (
                                        <tr key={index} className="border border-black ">
                                            <td className="py-2 border-r border-black px-4 text-center">{user._id.slice(-4)}</td>
                                            <td className="py-2 border-r border-black px-4">{user.firstName}</td>
                                            <td className="py-2 border-r border-black px-4">{user.email}</td>
                                            <td className="py-2 border-r border-black px-4 text-center">
                                                <button 
                                                onClick={()=>{
                                                   HandleDeleteUser(user._id)
                                                }} 
                                                className="bg-primary text-white px-4 py-1 rounded-full hover:bg-blue-600">
                                                    {deleteloading[user._id] ? "Deleting..." : "Delete"}
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

export default Users;
