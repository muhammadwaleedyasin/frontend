'use client'

import Section from '@/components/shared/Section'
import React, { useEffect, useState } from 'react'
import house4 from '/public/assets/house4.svg';
import hotel from '/public/assets/hotel.svg';
import hotel2 from '/public/assets/hotel2.svg';
import Image from 'next/image';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addWishlist, fetchWishlist, removeWishlist } from '@/redux/wishlishSlice';
import { fetchUser } from '@/redux/userSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { backend_url } from '@/libs/data';
import { LoaderComp } from '@/components/Loader';

const WishList = () => {

    const [wishlistData,setWishlistData] = useState('')
    const [loading,setLoading] = useState(false)
    const wishlist = useSelector((state) => state.wishlist.wishlists);
   const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user);
   

    useEffect(()=>{
        dispatch(fetchUser())
    },[dispatch])

    const GetData = async(email)=>{
        try{
            setLoading(true)
            const res = await axios.get(`${backend_url}/api/user/getwishlist/${email}`)
            setWishlistData(res.data.data)
        }
        catch(error)
        {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user && user.email)
        {
            GetData(user.email)
        }

    },[user])

    useEffect(()=>{
        if(user)
        {
            const userEmail = user.email
            dispatch(fetchWishlist(userEmail))
        }
       
      },[dispatch,user])
      useEffect(() => {
        if (!user) {
          dispatch(fetchUser());
        }
      }, [dispatch, user]);
      
      console.log("wi",wishlistData)
    const toggleFavorite = (id, property) => {
        const userEmail = user.email
        const isFavorited = wishlist.some(item => item.id === id);
        if (isFavorited) {
            dispatch(removeWishlist({ userEmail: userEmail, id }))
            .then(() => {
            setWishlistData((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
              dispatch(fetchWishlist(userEmail));
              toast.success(`${property.room} removed from wishlist`);
          })
          .catch((error) => {
              toast.error('Failed to remove from wishlist');
          });

        } else {
            dispatch(addWishlist({ userEmail: userEmail, propertyData: property }))
            .then(() => {
              dispatch(fetchWishlist(userEmail));
              toast.success(`${property.room} added to wishlist`);
          })
          .catch((error) => {
              toast.error('Failed to add to favorites');
          });
        }
    };
    

    const cards = [
        {
            id: 1, // Assign a unique ID to each card
            image: house4,
            title: 'Apartment Haus Gausteur',
            rating: '4.9/5',
            reviews: '50 Reviews',
            location: 'Sankht Glantrich, Austria',
            price: '€1580',
        },
        {
            id: 2, // Assign a unique ID to each card
            image: hotel,
            title: 'Apartment Haus Gausteur',
            rating: '4.9/5',
            reviews: '50 Reviews',
            location: 'Sankht Glantrich, Austria',
            price: '€1580',
        },
        {
            id: 3, // Assign a unique ID to each card
            image: hotel2,
            title: 'Apartment Haus Gausteur',
            rating: '4.9/5',
            reviews: '50 Reviews',
            location: 'Sankht Glantrich, Austria',
            price: '€1580',
        },
        {
            id: 4, // Assign a unique ID to each card
            image: hotel2,
            title: 'Apartment Haus Gausteur',
            rating: '4.9/5',
            reviews: '50 Reviews',
            location: 'Sankht Glantrich, Austria',
            price: '€1580',
        },
    ];
    const PropertyType = (type)=>{
        if(type==="room" || type === "studio" || type ==='H' || type==='R' || type==='A')
        {
            return "Hotel"
        }else if(type==='villa' || type==="S" || type==="V" || type==="F")
        {
            return "Villa"
        }else if(type==="suite" || type ==="apartment" || type ==="appartment" || type ==="maisonette" || type=="home" || type==="A" || type==="B" || type==="C")
        {
            return "Apartment"
        }
        
    }
    function deductDates(dateStop, dateStart) {
        const date1 = new Date(dateStop);
        const date2 = new Date(dateStart);
        const timeDifference = date1.getTime() - date2.getTime();
        const dayDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
        return dayDifference;
    }

    return (
        <>
            <div className="bg-white rounded-lg py-3  min-h-screen">
                <Section>
                    <div className="max-w-3xl mx-auto">
                        <div className="">
                            <h1 className='text-primary font-medium px-2 my-6'>My Wishlist</h1>
                        </div>
                        {
                            loading ? (
                                <LoaderComp/>
                            ) : (
                                <div className="grid md:grid-cols-3 grid-cols-1">
                                {wishlistData && wishlistData.map((property) => (
                                    <div key={property.id} className="p-2">
                                         <div className="bg-white rounded-3xl shadow overflow-hidden w-full">
                                <div className="relative w-full" style={{ height: '200px' }}>
                                  {/* Set fixed height */}
                                  <Image
                                    width={1920}
                                    height={1080}
                                    src={property?.url?.photoL}
                                    alt={property?.room}
                                    className="h-full w-full object-cover"
                                  />
                                  <div className="absolute top-0 right-0 p-3">
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevents the card click event from triggering
                                        toggleFavorite(property?.id,property);
                                      }}
                                      className="cursor-pointer bg-gray-300 md:h-7 md:w-7 h-9 w-9 rounded-full flex justify-center items-center"
                                    >
                                      {wishlist.some(wishItem => wishItem.id === property.id) ? (
                                        <MdFavorite className="md:text-xl text-2xl text-red-500" />
                                      ) : (
                                        <MdOutlineFavoriteBorder className="md:text-xl text-2xl text-white" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="p-2">
                                  <div className="flex flex-col items-center justify-start text-left py-2 gap-1">
                                    <div className="flex items-center justify-between w-full">
                                      <h3 className="md:text-md text-sm font-medium">
                                        {PropertyType(property?.unit_type)} in {property?.location?.name}
                                      </h3>
                                      <span className="text-yellow-500 text-2xl md:text-lg">
                                        ★{property?.rating | 0}.0
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-start w-full">
                                      <p className="text-sm text-gray-400 text-left truncate">
                                        {property?.room}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center py-1 gap-4"></div>
                                  <div className="flex items-center py-1 justify-between">
                                    <div className="flex gap-2">
                                      <p className="text-black md:text-sm text-lg font-semibold">
                                        €{property?.retail?.price}
                                      </p>
                                      <p className="text-[#AAAAAA] md:text-sm text-lg font-normal underline">
                                        €{ property?.retail?.price | 0} total
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                                    </div>
                                ))}
                            </div>
                            )
                        }
                     
                    </div>
                </Section>
            </div>
        </>
    )
}

export default WishList