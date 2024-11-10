'use client';

import Navbar from "@/components/shared/navbar";
import LandingPage from "./(website)/home/page";
import Footer from "@/components/shared/footer";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { fetchUser } from "@/redux/userSlice";
import { LoaderComp } from "@/components/Loader";

export default function Home() {
  const dispatch = useDispatch();
  const isUserLoading = useSelector((state) => state.user.loading); 
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      {isUserLoading ? (
        <LoaderComp />
      ) : (
        <Suspense fallback={<div></div>}>
          <Navbar data={user} />
          <LandingPage />
          <Footer />
      </Suspense>
      )}
    </>
  );
}
