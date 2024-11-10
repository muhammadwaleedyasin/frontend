'use client';
import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { fetchOwner } from '@/redux/ownerSlice';
import { LoaderComp } from '@/components/Loader';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';



const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const owner = useSelector((state) => state.owner.owner);
  const isOwnerLoading = useSelector((state) => state.owner.loading);

  useEffect(() => {
    dispatch(fetchOwner());
  }, [dispatch]);

  return (
    <div>
      {isOwnerLoading ? (
        <LoaderComp />
      ) : (
        <Suspense fallback={<div></div>}>
          <Navbar data={owner} />
        {children}
        <Footer />
      </Suspense>
      )}
    </div>
  );
};

export default Layout;
