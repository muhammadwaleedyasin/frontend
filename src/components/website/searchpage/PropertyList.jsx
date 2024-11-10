'use client'
import Section from '@/components/shared/Section';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MdOutlineFavoriteBorder, MdFavorite, MdMap, MdList } from 'react-icons/md';
import Pagination from '@/components/shared/Pagination';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { cards } from '@/data';
import axios from 'axios';
import { backend_url } from '@/libs/data';
import { LoaderComp } from '@/components/Loader';
import { GoogleMap, InfoWindow, useLoadScript,Marker } from '@react-google-maps/api';
import Button from '@/components/shared/Button';
import useCountries from '@/hooks/useCountries';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/redux/userSlice';
import { addWishlist, fetchWishlist, removeWishlist } from '@/redux/wishlishSlice';
import toast from 'react-hot-toast';


const PropertyList = ({lat,lon,guests,checkin,checkout,where,setPropertyLength }) => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const country = searchParams.get('country')
    const region = searchParams.get('region')
    const email = searchParams.get('email')
   
    const [sortedCards, setSortedCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showMap, setShowMap] = useState(false);
    const itemsPerPage = 20;
    const [data,setData] = useState('')
    const [loading,setLoading] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [highPriceFilter,setHighPriceFilter] = useState([])
    const [activeButton, setActiveButton] = useState(null);
    const [sortOrder, setSortOrder] = useState(''); 
    const [ownerProperties,setOwnerProperties] = useState([])
    const { getRegionCodeByName } = useCountries();
    const wishlist = useSelector((state) => state.wishlist.wishlists);
   const dispatch = useDispatch()
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBLEV6glXZvKU8R5lyx7v7OV7HD4kjPZeo", 
    });

    const user = useSelector((state) => state.user.user);
    const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated);
    useEffect(()=>{
      const userEmail = email
       dispatch(fetchWishlist(userEmail))
    },[dispatch])
    useEffect(() => {
      if (!user) {
        dispatch(fetchUser());
      }
    }, [dispatch, user]);
    
    console.log("wi",wishlist)
    const formatDateToISO = (dateString) => {
        const [month, day, year] = dateString.split('/');
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      };
      
      const CountrytoCode = (country)=>{
        if(country==='Cyprus'){
            return 59
        }
        else if(country==='Greece')
        {
            return 86
        }
        else if(country==='United Arab Emirates')
        {
            return 234
        }
      }
      const filterByLocationName = (data) => {
        return data.filter(booking => booking.location.name === region);
    };
    
    function deductDates(dateStop, dateStart) {
      const date1 = new Date(dateStop);
      const date2 = new Date(dateStart);
      const timeDifference = date1.getTime() - date2.getTime();
      const dayDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
      return dayDifference;
  }
  
  const filterAndSortData = (responseData,type) => {
    const filterNull = responseData.filter((item) => item.unit_type !== '');
    const sortedData = filterNull.sort((a, b) => {
        if (a.reference === "owner" && b.reference !== "owner") {
            return -1;
        }
        if (a.reference !== "owner" && b.reference === "owner") {
            return 1;
        }
        return 0;
    });

    let data = sortedData
    if(type==="region")
    {
       data = filterByLocationName(sortedData);
    }
    setPropertyLength(data?.length);
    setData(data);
};




 
    const GetData = async()=>{
      const regionCode = getRegionCodeByName(region);
        try{
            setLoading(true)
          const res =  await axios.post(`${backend_url}/search`,{
                    res_country_id: CountrytoCode(country),
                    date_from: formatDateToISO(checkin),
                    date_to: formatDateToISO(checkout),
                    adults: guests,
                    country_code:where,
                    nights:deductDates(checkout,checkin),
                    regionCode:regionCode,
                    regionName:region
                    
            })
            if(region)
            {
              const filterNull = res.data.data.filter((item) => item.unit_type !== '');
           
             
              const data = filterByLocationName(filterNull);
            
              setPropertyLength(data.length);
              setData(data);
              //filterAndSortData(res.data.data,'region');
            }
            else{
              //filterAndSortData(res.data.data,'no');
              const filterNull = res.data.data.filter((item) => item.unit_type !== '');
             
          
           //  const data = filterByLocationName(sortedData);
            
              setPropertyLength(filterNull.length);
              setData(filterNull);
    
            }
          
        }catch(error)
        {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

   
  

    useEffect(()=>{
        if(checkin)
        //  setData(null)
        GetData()

    },[checkin,checkout,country,guests,region])

   // console.log("da",data)
    console.log("owner",data)




    useEffect(()=>{
        if(data)
        {
        
          const highRatedProperties = sortByRating(data);
          const sortedData = highRatedProperties.sort((a, b) => {
            if (a.reference === "owner" && b.reference !== "owner") {
                return -1;
            }
            if (a.reference !== "owner" && b.reference === "owner") {
                return 1;
            }
            return 0;
        });
          setHighPriceFilter(sortedData)
        }
    },[data])

    const sortByRating = (data) => {
        return data.sort((a, b) => b.rating - a.rating);
      };
      
      const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };
  
    
    const TypeFilter = (filter) => {
        if (data && data?.length > 0) {
            let filteredData = [];
            
            if (filter === "hotel") {
                filteredData = data.filter((a) => a.unit_type === "room" || a.unit_type === "studio" || a.unit_type ==='H' || a.unit_type==='R' || a.unit_type==='A');
            } else if (filter === "villa") {
                filteredData = data.filter((a) => a.unit_type === "villa" || a.unit_type==="S" || a.unit_type==="V" || a.unit_type==="F");
            } else if (filter === "appartment") {
                filteredData = data.filter((a) => a.unit_type === "suite" || a.unit_type === "appartment" || a.unit_type === "maisonette" || a.unit_type=="home" || a.unit_type==="A" || a.unit_type==="B" || a.unit_type==="C");
            }
          
    
            setHighPriceFilter(filteredData);
            setPropertyLength(filteredData.length)
        }
    };
    
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

    // useEffect(() => {
    //     if (data && data.length > 0) {
    //         ApplyPriceFilter('high');
    //     }
    // }, [data]);
    
    const ApplyPriceFilter = (type) => {
        if (data && data?.length > 0) {
            let filteredData = [];
            if (type === 'high') {
                filteredData = [...data].sort((a, b) => b.retail.price - a.retail.price);  
            } else {
                filteredData = [...data].sort((a, b) => a.retail.price - b.retail.price); 
            }
            setHighPriceFilter(filteredData);
            setSortOrder(type);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({
          top: 0,
          behavior: 'smooth', 
      });
    };

  

   
    const toggleFavorite = (id, property) => {
      if(!isAuthenticated)
      {
         router.push('/?login=true');
         return
      }
      const userEmail = email
      const isFavorited = wishlist.some(item => item.id == id);
      if (isFavorited) {
          dispatch(removeWishlist({ userEmail: email, id }))
          .then(() => {
            dispatch(fetchWishlist(userEmail));
            toast.success(`${property.room} removed from wishlist`);
        })
        .catch((error) => {
            toast.error('Failed to remove from wishlist');
        });
      } else {
          dispatch(addWishlist({ userEmail: email, propertyData: property }))
          .then(() => {
            dispatch(fetchWishlist(userEmail));
            toast.success(`${property.room} added to wishlist`);
        })
        .catch((error) => {
            toast.error('Failed to add to favorites');
        });
      }
  };
  

    const navigateToPropertyDetails = (pcode,rcode,price,location,id,basePrice,reference) => {
        router.push(`/property-details?pcode=${pcode}&where=${where}&pid=${''}&rateId=${id}&bp=${basePrice}&rcode=${rcode}&nights=${deductDates(checkout,checkin)}&checkin=${checkin}&checkout=${checkout}&tp=${reference==="interhome" ? price : deductDates(checkout,checkin)*price}&guests=${guests}&lat=${location.lat}&lon=${location.lon}&ref=${reference}&email=${email}`);
    };

    // Calculate the items to be displayed on the current page
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentItems = highPriceFilter.slice(startIdx, endIdx);
    const totalPages = Math.ceil(highPriceFilter?.length / itemsPerPage);

    return (
        <Section>
            {loading ? (
            <LoaderComp/>
            ) : (
         <div className="max-w-6xl mx-auto">
               <div className="flex border border-gray-300 bg-gray-100 rounded-full w-[89%] md:w-[28.7%]  items-center">
                        <button
                            className='border-r border-gray-300 bg-gray-100 px-4 rounded-full py-1 text-sm'
                            disabled
                        >
                            Sort By
                        </button>
                        <button
                             onClick={() => ApplyPriceFilter('high')}
                            className={`border-r border-gray-300 bg-gray-100 px-4 rounded-full py-1 text-sm ${sortOrder === 'high' ? 'font-semibold' : ''}`}
                        >
                            Price highest
                        </button>
                        <button
                             onClick={() => ApplyPriceFilter('low')}
                            className={`px-4 rounded-full py-1 text-sm ${sortOrder === 'low' ? 'font-semibold' : ''}`}
                        >
                            Price lowest
                        </button>
                    </div>
            <div className="flex justify-center md:py-0 py-5 relative items-center">
                        <div className="px-4 justify-center md:absolute md:top-1  gap-5 flex">
                            <Button
                                label='Hotels'
                                style={`text-sm ${activeButton === 'Hotels' ? 'bg-primary text-white' : 'bg-transparent border !border-primary !text-primary'}`}
                                onClick={() => {
                                    handleButtonClick('Hotels')
                                    TypeFilter('hotel')
                                }}
                            />
                            <Button
                                label='Villas'
                                style={`text-sm ${activeButton === 'Villas' ? 'bg-primary text-white' : 'bg-transparent border !border-primary !text-primary'}`}
                                onClick={() => {
                                    handleButtonClick('Villas')
                                    TypeFilter('villa')
                                }}
                            />
                            <Button
                                label='Apartments'
                                style={`text-sm ${activeButton === 'Apartments' ? 'bg-primary text-white' : 'bg-transparent !border !border-primary !text-primary'}`}
                                onClick={() => {
                                    handleButtonClick('Apartments')
                                    TypeFilter('appartment')
                                }
                                }
                            />
                        </div>
                    </div>
                <div className="flex justify-end mb-5">
                    <button
                        onClick={() => setShowMap(!showMap)}
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg"
                    >
                        {showMap ? (
                            <>
                                <MdList className="text-xl" />
                                Show List
                            </>
                        ) : (
                            <>
                                <MdMap className="text-xl" />
                                Show Map
                            </>
                        )}
                    </button>
                </div>
                {showMap && isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={{
                                width: '100%',
                                height: '500px',
                            }}
                            zoom={8}
                            center={{ lat: parseFloat(currentItems[0].location.lat) || 47.2692, lng: parseFloat(currentItems[0].location.lon) || 11.4041 }}
                        >
                            {currentItems.map((hotel, index) => (
                                <Marker
                                    key={index}
                                    position={{
                                        lat: parseFloat(hotel.location.lat),
                                        lng: parseFloat(hotel.location.lon),
                                    }}
                                    onClick={() => setSelectedProperty(hotel)}
                                />
                            ))}

                            {selectedProperty && (
                                <InfoWindow
                                    position={{
                                        lat: parseFloat(selectedProperty.location.lat),
                                        lng: parseFloat(selectedProperty.location.lon),
                                    }}
                                    onCloseClick={() => setSelectedProperty(null)}
                                >
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src={selectedProperty.url.photoL}
                                            alt={selectedProperty.room}
                                            width={100}
                                            height={100}
                                        />
                                        <p>{selectedProperty.room}</p>
                                        <p>€{selectedProperty.retail.price}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                ) : (
                    <>
                    {
                      data?.length > 0 ? (
                        <div className="grid md:grid-cols-4 gap-4 grid-cols-1">
                          {currentItems && currentItems.map((property, index) => (
                            <div
                              key={index}
                              className="py-2 cursor-pointer"
                              onClick={() => navigateToPropertyDetails(
                                property?.propertyCode,
                                property?.type,
                                property?.retail?.price,
                                property?.location,
                                property?.id,
                                property?.retail?.price,
                                property?.reference
                              )}
                            >
                              <div className="bg-white rounded-3xl shadow overflow-hidden w-full">
                                <div className="relative w-full" style={{ height: '200px' }}>
                                  {/* Set fixed height */}
                                  <img
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
                                      {wishlist.some(wishItem => wishItem.id == property.id) ? (
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
                                        {PropertyType(property?.unit_type)} in {property?.location?.name || country }
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
                                        €{property.reference === "interhome" ? property?.retail?.price / deductDates(checkout, checkin) | 0 : property?.retail?.price | 0}
                                      
                                      </p>
                                      <p className="text-[#AAAAAA] md:text-sm text-lg font-normal underline">
                                        €{property.reference==="interhome" ? property?.retail?.price | 0 : deductDates(checkout, checkin) * property?.retail?.price | 0} total
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className='flex items-center justify-center text-2xl py-10'>
                          <p>No Properties Found</p>
                        </div>
                      )
                    }
                  
                    <Pagination
                      pageCount={totalPages}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </>
                  
                )}
            </div>
            )}
            
        </Section>
    );
};

export default PropertyList;
