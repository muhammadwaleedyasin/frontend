'use client'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { TbArrowBarLeft } from "react-icons/tb";
import { HiMenuAlt3 } from "react-icons/hi";
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const Navbar = ({ toggleSidebar }) => {
    const router = useRouter()
    const pathName = usePathname();
    const dispatch = useDispatch()

    const HandleExit = ()=>{
        if(pathName.startsWith('/dashboard/admin'))
        {
            router.push('/admin')
            dispatch(logout())
            toast.success('admin Logged out')
            return
        }
        router.push('/')
    }

    return (
        <div className='bg-transparent w-full flex justify-between items-start py-3 px-2 pr-5' >
            <h1 className='text-primary font-semibold lg:text-2xl sm:text-xl text-sm underline lg:decoration-[3px] underline-offset-8'>RentPrivateVillas</h1>
            <div className={`xl:w-[30%] lg:w-[40%] items-center sm:w-[50%] w-fit sm:gap-0 gap-4 flex  ${pathName === '/dashboard' ? 'justify-between' : 'justify-end'} `}>
                {pathName === '/dashboard' &&
                    <Link href='/add-property'>
                        <button className='bg-primary md:mt-2 text-white sm:px-5 px-2 rounded-full py-1.5 sm:text-sm text-sm' >
                            Add <span className='sm:inline-block hidden' >new</span> property
                        </button>
                    </Link>
                }
                <button className='text-primary  md:flex hidden items-center gap-2' onClick={()=>{
                    HandleExit()
                }}>
                    <TbArrowBarLeft className='text-2xl' />
                    <p className='text-lg' >Exit</p>
                </button>
                <div className='md:hidden block' onClick={toggleSidebar}>
                    <HiMenuAlt3 className='text-primary text-3xl' />
                </div>
            </div>


        </div>
    )
}

export default Navbar
