'use client'
import React, { use, useEffect } from 'react'
import profile from '/public/assets/profile.svg'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SidebarData } from '@/data';
import { ActiveShieldicon, Shieldicon } from '@/svgs';
import { TbArrowBarLeft } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/adminAuth';
import toast from 'react-hot-toast';



const Sidebar = ({data}) => {
    console.log("data in sidebar",data)
    const pathName = usePathname();
    const router = useRouter()
    const dispatch = useDispatch()
    // Determine the role based on the current path
    const getRoleFromPath = () => {
        if (pathName.startsWith('/dashboard/admin')) {
            return 'admin';
        } else if (pathName.startsWith('/dashboard/user')) { // user paths should be checked before owner
            return 'user';
        } else if (pathName.startsWith('/dashboard')) {
            return 'owner';
        }
        return null;
    };
    const role = getRoleFromPath();
    const HandleExit = ()=>{
        if(role==="admin")
        {
            router.push('/admin')
            dispatch(logout())
            toast.success('admin Logged out')
            return
        }
        router.push('/')
    }

    
    const menuItems = SidebarData[role] || [];

    return (
        <div className='bg-[#181818]  py-3 pt-10 px-4 rounded-xl flex flex-col justify-between h-full'>
            <div className='flex flex-col justify-between gap-14 items-center'>
                <div className='flex flex-col items-center gap-3'>
                    <Image alt='' src={profile} className='rounded-full' />
                    <h1 className='text-2xl font-semibold text-white'>{data?.firstName} {data?.lastName}</h1>
                    <p className='text-[#7F7F7F] text-xs'>ID: {data?._id?.slice(0,6)}</p>
                </div>

                <div className='flex flex-col gap-1 w-full'>
                    {menuItems.map((e, i) => (
                        <Link key={i} href={e.src} className={`sm:px-3 px-2 py-2 w-full justify-between rounded-md flex items-center ${pathName === e.src ? 'bg-black text-[#fafafa]' : 'bg-transparent text-secondary'}`}>
                            <div className='flex items-center sm:gap-4 gap-2'>
                                {/* Check if icon components are rendering */}
                                {e.icon ? e.src === pathName ? e.activeIcon : e.icon : <p>Error: Icon not found</p>}
                                <p>{e.name}</p>
                            </div>
                            {e.src === pathName && <div className='w-[2px] h-5 bg-[#00B578] sm:ml-3'></div>}
                        </Link>
                    ))}
                </div>
            </div>

            <div className='flex flex-col items-start sm:px-3 px-2 h-[15%] justify-between'>
                <Link href={'/contactus'} className={`flex items-center sm:px-3 px-2 rounded-md w-full py-2 sm:gap-4 gap-3 ${pathName === '/dashboard/help-support' ? 'text-white bg-black' : 'bg-transparent text-secondary'}`}>
                    {pathName === '/dashboard/help-support' ? <ActiveShieldicon /> : <Shieldicon />}
                    <p>Help & Support</p>
                </Link>
                <button className='text-[#F10A0A] flex items-center sm:gap-4 gap-3 sm:px-3 px-2' onClick={()=>{
                   HandleExit()
                }}>
                    <TbArrowBarLeft className='text-2xl' />
                    <p>Exit</p>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;