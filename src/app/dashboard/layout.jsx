'use client';
import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import { fetchOwner } from '@/redux/ownerSlice';
import { fetchUser } from '@/redux/userSlice';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderComp } from '@/components/Loader';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated);
  const isOwnerAuthenticated = useSelector((state) => state.ownerAuth.isOwnerAuthenticated);
  const user = useSelector((state) => state.user.user);
  const owner = useSelector((state) => state.owner.owner);
  const isUserLoading = useSelector((state) => state.user.loading);
  const isOwnerLoading = useSelector((state) => state.owner.loading);

  useEffect(() => {
    if (pathname === '/dashboard' && !isOwnerAuthenticated) {
      router.push('/list-your-property');
    } else if (pathname === '/dashboard/userdashboard/dashboard' && !isAuthenticated) {
      router.push('/');
    }
  }, [pathname, isOwnerAuthenticated, isAuthenticated, router]);

  useEffect(() => {
    if (pathname === '/dashboard') {
      dispatch(fetchOwner());
    } else if (pathname === '/dashboard/userdashboard/dashboard') {
      dispatch(fetchUser());
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    if (pathname === '/dashboard' && owner) {
      setData(owner);
    } else if (pathname === '/dashboard/userdashboard/dashboard' && user) {
      setData(user);
    }
  }, [pathname, owner, user]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isLoading = (pathname === '/dashboard' && isOwnerLoading) || (pathname === '/dashboard/userdashboard/dashboard' && isUserLoading);

  return (
    <>
    
        {isLoading ? (
        <LoaderComp />
      ) : (
     
    <div className='w-full min-h-screen flex justify-between overflow-auto bg-[#F5F5F5] relative'>
          {/* Sidebar overlay for mobile view */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div className={`fixed top-0 p-1 left-0 h-screen z-50 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 xl:w-[20%] lg:w-[25%] md:w-[33%] w-[70%]`}>
            <Sidebar data={data} />
          </div>

          {/* Main content */}
          <div className='flex-1 xl:ml-[20%] lg:ml-[25%] md:ml-[33%] ml-0 w-full'>
            <div className='sticky top-0 z-50 w-full'>
              <Navbar toggleSidebar={toggleSidebar} />
            </div>
            <div className='p-4'>
              {children}
            </div>
          </div>
        
     
    </div>
     )}
    
    </>  
    );
};

export default Layout;
