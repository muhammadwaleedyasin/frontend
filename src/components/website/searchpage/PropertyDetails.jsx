'use client'
import Section from '@/components/shared/Section'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import homemap from '/public/assets/homemap.svg'
import master from '/public/assets/master.svg'
import bitcoin from '/public/assets/bitcoin.svg'
import visa from '/public/assets/visa.svg'
import revolut from '/public/assets/revolut.svg'
import { useRouter, useSearchParams } from 'next/navigation'
import { backend_url } from '@/libs/data'
import axios from 'axios'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { LoaderComp } from '@/components/Loader'
import CustomCalenderSelect from '@/components/shared/CustomCalenderSelect'
import { DateRange } from 'react-date-range'
import BookingDetails from '@/app/(website)/booking-details/page'
import ImageModal from '@/components/ImageModel'

import { FaBed } from 'react-icons/fa6'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';

const PropertyDetails = () => {
    const searchParams = useSearchParams();
    const [propertyDetails,setPropertyDetails] = useState('')
    const pcode = searchParams.get('pcode');
    const rcode = searchParams.get('rcode');
    const nights = searchParams.get('nights');
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const totalPrice = searchParams.get('tp');
    const country = searchParams.get('where');
    const rateId = searchParams.get('rateId');
    const pid = searchParams.get('pid');
    const bp = searchParams.get('bp');
    const lat = parseFloat(searchParams.get('lat'));
    const lon = parseFloat(searchParams.get('lon'));
    const guests = searchParams.get('guests');
    const ref = searchParams.get('ref');
    const email = searchParams.get('email');
    const [loading,setLoading] = useState(false)
    const [ploading,setPLoading] = useState(true)
    const [open,setIsOpen] = useState(false)
    const [selectedProperty,SetSelectedProperty] = useState(null)
    const router = useRouter()

    const [selectedRange, setSelectedRange] = useState([])
    const [calenderAvailability,setCalenderAvailability] = useState([])
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [pdetails,setPDetails] = useState([])
    const [ownerAmenities,setOwnerAmenities] = useState([])


    const [isModalOpen, setModalOpen] = useState(false);

    const [showMore, setShowMore] = useState(false);
 
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    const handleShowAllImages = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const HandleClose = ()=>{
        setIsOpen(false)
        SetSelectedProperty(null)
    }

    const pos = useMemo(() => {
        if (lat && lon) {
          return { lat, lng: lon };
        }
        return null; 
      }, [lat, lon]);

      const GetData = async(id)=>{
        try{
           
            setPLoading(true)
        const res = await axios.get(`${backend_url}/api/user/getallownerproperties/${id}`);
            setPDetails(res.data.property)
            setOwnerAmenities(res.data.amenities)
        }catch(error)
        {
            console.log(error)
        }
        finally{
            setPLoading(false)
        }
    }

  

    console.log('d',pdetails)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBLEV6glXZvKU8R5lyx7v7OV7HD4kjPZeo",
        libraries: ["places"],
    });
    const GetPropertyDetails = async(code)=>{
        try{
            setLoading(true)
            const res = await axios.get(`${backend_url}/roominfo?pcode=${pcode}&rcode=${rcode}`);
            setPropertyDetails(res.data)
        }catch(error)
        {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    const GetInterHome = async(code)=>{
        try{
            setLoading(true)
            const res = await axios.get(`${backend_url}/api/accommodation-detail/${code}`);
            setPropertyDetails(res.data)
        }catch(error)
        {
            console.log(error)
        }
        finally{
            setLoading(false)
        }

    }


    

    
    const fetchAvailability = async (propertyCode, year, month) => {
        try {
            const res = await axios.get(`${backend_url}/calender`, {
                params: {
                    year: year,
                    month: month,
                    nights: nights,
                    code:propertyCode
                }
            });
            return res.data.data;
        } catch (error) {
            console.error("Error fetching availability:", error);
            return null;
        }
    };
    const fetchYearlyAvailability = async (propertyCode, year) => {
        const allMonthsData = [];
        const currentMonth = new Date().getMonth() + 1;
    
        for (let month = currentMonth; month <= 12; month++) {
            try {
                const data = await fetchAvailability(propertyCode, year, month);
                if (data) {
                    allMonthsData.push(...data.days);
                }
            } catch (error) {
                console.error(`Error fetching availability for month ${month}:`, error);
            }
        }

        const unavailableDatesArray = allMonthsData
      .filter(day => day.status !== 'AVL')
      .map(day => new Date(day.date));

    setUnavailableDates(unavailableDatesArray);
    
        setCalenderAvailability(allMonthsData);
    };
    
    

  // console.log("cc",calenderAvailability)
    useEffect(()=>{
        if(pcode)
        {
            if(ref==='interhome')
            {
               GetInterHome(pcode)
            }
            else{
                GetPropertyDetails(pcode)
                fetchYearlyAvailability(pcode,2024)
            }
            
        }
    },[pcode])

    useEffect(()=>{
        if(rateId && ref === "owner")
        {
            GetData(rateId)
        }

    },[rateId])


  

    const PropertyTypeWebh = (type)=>{
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
   

   useEffect(() => {
    if (checkin && checkout) {
        setSelectedRange([{
            startDate: new Date(checkin),
            endDate: new Date(checkout),
            key: 'selection'
        }])
    }
}, [checkin, checkout])

const handleDateChange = (ranges) => {
    const { selection } = ranges;
    setSelectedRange([selection]);
}

   console.log("pr",propertyDetails)

   const handleClick = () => {
    setIsOpen(true);
  
    // Create an array with property details
    const data =
        {
        price:totalPrice,
        name:propertyDetails.name,
        photo:propertyDetails.photos[0]?.large, 
        type: PropertyTypeWebh(propertyDetails.unit_type),
        country:country,
        rateId:rateId,
        checkin,
        checkout,
        nights,
        bp,
        guests,
        pcode,
        reference:ref,
        email:email,
        unitId:propertyDetails.code
   
        }
      
        

  
    // Encode the data as a query string
    const propertyString = encodeURIComponent(JSON.stringify(data));
    
    // Navigate to the booking details page with the property data as a query parameter
    router.push(`/booking-details?property=${propertyString}`);
  };

  const PropertyType = (type)=>{
    if(type==="home" || type === "appartment")
    {
        return "Apartment"
    }else if(type==='villa')
    {
        return "Villa"
    }
    
}

   const handlePay = async(pdetails) => {
    const price = pdetails.checkDetails?.unitDiscount
    ? (totalPrice * (1 - pdetails.checkDetails.unitDiscount / 100))
    : totalPrice

    const data =
    {
    price:price,
    name:pdetails.propertyDetails.propertyName,
    photo:pdetails.placeImages[0], 
    type:PropertyType(pdetails.propertytype),
    country:country,
    rateId:rateId,
    checkin,
    checkout,
    nights,
    bp,
    guests,
    pcode,
    reference:ref,
    email:email,
    ownerId:pdetails.ownerId,
    unitId: pdetails?.checkDetails?.unitId
    }
  
    


    // Encode the data as a query string
    const propertyString = encodeURIComponent(JSON.stringify(data));

    // Navigate to the booking details page with the property data as a query parameter
    router.push(`/booking-details?property=${propertyString}`);


   
  };
  

  // console.log("un",unavailableDates)

    return (
        <Section>
            {
                loading ? (
                    <LoaderComp/>

                ) : (
                 propertyDetails ? (  
                    <div className="max-w-6xl mx-auto p-4">
                    <div className="grid grid-cols-1 relative lg:grid-cols-3 gap-8">
                        {/* Left Side - Image Gallery */}
                        <div className="lg:col-span-3 relative">
                            <div onClick={handleShowAllImages} className="grid grid-cols-4   lg:gap-4 md:gap-3 gap-2 ">
                                <div className="col-span-2">
                                    <Image src={propertyDetails && propertyDetails?.photos[0]?.large} alt="Main Room" width={1920} height={1080} className="rounded-lg object-cover h-[85%]" />
                                </div>
                                <div className="col-span-1 lg:space-y-5 md:space-y-3 space-y-2">
                                    <Image src={propertyDetails && propertyDetails?.photos[0]?.medium} width={1920} height={1080} alt="Room View 1" className="rounded-lg h-[40%] object-cover" />
                                    <Image src={propertyDetails && propertyDetails?.photos[1]?.medium} width={1920} height={1080} alt="Room View 2" className="rounded-lg h-[40%] object-cover" />
                                </div>
                                {
                                    propertyDetails && propertyDetails.photos.length >= 2 && (
                                        <div className="col-span-1  lg:space-y-5 md:space-y-3 space-y-2">
                                        <Image src={propertyDetails && propertyDetails?.photos[3]?.medium} width={1920} height={1080} alt="Room View 3" className="rounded-lg h-[40%] object-cover" />
                                        <Image src={propertyDetails && propertyDetails?.photos[4]?.medium ?propertyDetails?.photos[4].medium : propertyDetails && propertyDetails?.photos[3]?.medium} width={1920} height={1080} alt="Room View 4" className="rounded-lg h-[40%] object-cover" />
                                    </div>
                                    )
                                }
                               
                            </div>
                            <button onClick={handleShowAllImages} className="text-black px-2 text-sm py-1 bg-white hover:scale-105 duration-300 transition-all rounded-full right-3 absolute bottom-3 ">Show all</button>
                        </div>
                    </div>
                    <div className="grid py-4 grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Room Details */}
                            <div className="space-y-2">
            <h2 className="text-xl font-semibold">{propertyDetails && propertyDetails.name}</h2>
            <p className="text-gray-600 py-2">{guests} guests</p>
            
            {/* Conditional rendering for the description */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: showMore ? propertyDetails && propertyDetails.description : `${propertyDetails && propertyDetails.description.substring(0, 200)}...`,
                                }}
                            />
                            
                            <div className="py-4">
                                <button 
                                    className="border px-2 py-1 rounded-md hover:scale-105 duration-300 transition-all border-black font-semibold" 
                                    onClick={toggleShowMore}
                                >
                                    {showMore ? 'Show less' : 'Show more'}
                                </button>
                            </div>
                            <div className="py-2">
                                <hr />
                            </div>
                        </div>
    
                        <div className="space-y-3">
                        <h2 className="text-xl font-medium">Amenities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                            {propertyDetails &&
                            propertyDetails.amenities.map((facility, index) => {
                                return <p className=' truncate' key={index}>{facility}</p>;
                            })}
                        </div>
                        </div>

    
                            <div className="space-y-2">
                                <h1>Calendar</h1>
                                <h1>{nights} Nights in</h1>
                                <DateRange
                                ranges={selectedRange}
                                onChange={handleDateChange}
                                // highlightDates={unavailableDates}
                               // excludeDates={unavailableDates}
                                disabledDates={unavailableDates}
                                 months={1} 
                                direction="horizontal"
                                minDate={new Date()} 
                            />
                            </div>
    
                            <div className="space-y-2">
                                <h1>No reviews yet</h1>
                               
    
                                <div className="py-2">
                                    <hr className='' />
                                </div>
                            </div>
    
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">Your booking quote</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Check-in</span>
                                        <span>{checkin}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Check-out</span>
                                        <span>{checkout}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Nights</span>
                                        <span>{nights} nights</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total rent</span>
                                        <span>€{totalPrice|0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Online deposit</span>
                                        <span>€{totalPrice | 0}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p>Pay with</p>
                                    <div className="flex md:flex-row gap-5 md:gap-0 flex-col py-4 items-center justify-center">
                                        <Image src={master} width={1920} height={1080}  alt='' className='h-8' />
                                        <Image src={bitcoin} width={1920} height={1080}  alt='' className='h-8' />
                                        <Image src={visa} width={1920} height={1080}  alt='' className='h-5' />
                                        <Image src={revolut} width={1920} height={1080}  alt='' className='h-5' />
                                    </div>
                                </div>
                                <button className="mt-6 bg-black text-white hover:scale-105 duration-300 transition-all w-full py-2 rounded-lg">Change dates</button>
                                <button className="mt-2 bg-primary text-white hover:scale-105 duration-300 transition-all w-full py-2 rounded-lg" onClick={()=>{
                                    handleClick()
                                      
                                }}>Confirm and Pay</button>
                            </div>
                        </div>
                    </div>
    
                    {/* map */}
    
                    <div className="">
                        <h1>Map</h1>
                        {isLoaded && (
                                    <GoogleMap
                                        mapContainerStyle={{ height: "400px", width: "100%" }}
                                        center={pos}
                                        zoom={14}
                                        // onClick={onMapClick}
                                    >
                                       <Marker
                                        position={pos}
                                        draggable={false}
                                        icon={{
                                            url: '/assets/homemap2.svg',
                                            scaledSize: new google.maps.Size(50, 50), // Adjust size as needed
                                        }}
                                    />
                                    </GoogleMap>
                                )}
                    </div>


                    {/* <BookingDetails isOpen = {open} onClose={HandleClose} property = {propertyDetails} /> */}
    
                </div>
                )
                :

                pdetails ? (  
                    <div className="max-w-6xl mx-auto p-4">
                    <div className="grid grid-cols-1 relative lg:grid-cols-3 gap-8">
                        {/* Left Side - Image Gallery */}
                        <div className="lg:col-span-3 relative" onClick={handleShowAllImages}>
                            <div className="grid grid-cols-4  lg:gap-4 md:gap-3 gap-2">
                            <div className="col-span-2">
                                    <img src={pdetails && pdetails?.placeImages?.[0]} alt="Main Room" width={1920} height={1080} className="rounded-lg" />
                             </div>
                           

                                <div className="col-span-1 lg:space-y-5 md:space-y-3 space-y-2">
                                    <img src={pdetails && pdetails?.placeImages?.[1]} width={1920} height={1080} alt="Room View 1" className="rounded-lg min-h-[20%] object-cover" />
                                    <img src={pdetails && pdetails?.placeImages?.[2]} width={1920} height={1080} alt="Room View 2" className="rounded-lg min-h-[20%] object-cover" />
                                </div>
                                
                                <div className="col-span-1 lg:space-y-5 md:space-y-3 space-y-2">
                                <img src={pdetails && pdetails?.placeImages?.[3]} width={1920} height={1080} alt="Room View 3" className="rounded-lg min-h-[20%] object-cover" />
                                <img src={pdetails && pdetails?.placeImages?.[4]} width={1920} height={1080} alt="Room View 4" className="rounded-lg min-h-[20%] object-cover" />
                            </div>
                                 
                                
                               
                            </div>
                            <button onClick={handleShowAllImages} className="text-black px-2 text-sm py-1 bg-white hover:scale-105 duration-300 transition-all rounded-full right-3 absolute bottom-3 ">Show all</button>
                        </div>
                    </div>
                    <div className="grid py-4 grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Room Details */}
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold">{pdetails && pdetails?.propertyDetails?.propertyName}</h2>
                                <p className="text-gray-600 py-2">{guests} guests</p>
                                <div
                                    dangerouslySetInnerHTML={{ __html: showMore ? pdetails && pdetails?.propertyDetails?.description :pdetails && `${pdetails?.propertyDetails?.description.substring(0,200)}...` }}
                                />
                                  <div className="py-4">
                                <button 
                                    className="border px-2 py-1 rounded-md hover:scale-105 duration-300 transition-all border-black font-semibold" 
                                    onClick={toggleShowMore}
                                >
                                    {showMore ? 'Show less' : 'Show more'}
                                </button>
                            </div>
                                <div className="py-2">
                                    <hr className='' />
                                </div>
    
                            </div>
    
                            <div className="space-y-3">
                                <h2 className="text-xl font-medium">Amenities</h2>
                                 <div className="grid grid-cols-2 md:grid-cols-2  gap-2 text-sm">
                                    {
                                        ownerAmenities && ownerAmenities.map((facility,index)=>{
                                            return (
                                            <p key={index}>{facility}</p>
                                            )
                                        })
                                    }
                                </div> 
                                <div className="py-2">
                                    <hr className='' />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-xl font-medium">Sleeping Arrangements</h2>

                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 2,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                        },
                                    }}
                                    className="text-sm"
                                >
                                    {pdetails && pdetails.roomDetails?.bedrooms.map((bedroom, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="flex flex-col p-4 items-center justify-center rounded-lg border border-gray-300">
                                                <FaBed size={20} />
                                                <p className="font-semibold">Bedroom {index + 1}</p>
                                                <p className="text-gray-500">{bedroom.noOfbeds} {bedroom.bedType}</p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <div className="py-2">
                                    <hr />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h1>Calendar</h1>
                                <h1>{nights} Nights in</h1>
                                <DateRange
                                ranges={selectedRange}
                                onChange={handleDateChange}
                                // highlightDates={unavailableDates}
                               // excludeDates={unavailableDates}
                                disabledDates={pdetails.unavailableDates}
                                 months={1} 
                                direction="horizontal"
                                minDate={new Date()} 
                            />
                            </div>
    
                            <div className="space-y-2">
                                <h1>No reviews yet</h1>
                               
    
                                <div className="py-2">
                                    <hr className='' />
                                </div>
                            </div>
    
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">Your booking quote</h3>
                                <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Check-in</span>
                                    <span>{checkin}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Check-out</span>
                                    <span>{checkout}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Nights</span>
                                    <span>{nights} nights</span>
                                </div>

                                {pdetails.checkDetails?.unitDiscount && (
                                    <>
                                        <div className="flex justify-between">
                                            <span>Discount</span>
                                            <span>{pdetails.checkDetails.unitDiscount}%</span>
                                        </div>

                                        {/* Calculation for the discount amount */}
                                        <div className="flex justify-between">
                                            <span>Discount Amount</span>
                                            <span>€{(totalPrice * (pdetails.checkDetails.unitDiscount / 100)).toFixed(2)}</span>
                                        </div>
                                    </>
                                )}

                                <div className="flex justify-between">
                                    <span>Rent</span>
                                    <span>€{totalPrice}</span>
                                </div>

                                {/* Total Rent calculation with discount applied */}
                                <div className="flex justify-between">
                                    <span>Total Rent</span>
                                    <span>
                                        €
                                        {pdetails.checkDetails?.unitDiscount
                                            ? (totalPrice * (1 - pdetails.checkDetails.unitDiscount / 100)).toFixed(2)
                                            : totalPrice
                                        }
                                    </span>
                                </div>
                            </div>

                                <div className="mt-4">
                                    <p>Pay with</p>
                                    <div className="flex md:flex-row gap-5 md:gap-0 flex-col py-4 items-center justify-center">
                                        <Image src={master} alt='' className='h-8' />
                                        <Image src={bitcoin} alt='' className='h-8' />
                                        <Image src={visa} alt='' className='h-5' />
                                        <Image src={revolut} alt='' className='h-5' />
                                    </div>
                                </div>
                                <button className="mt-6 bg-black text-white hover:scale-105 duration-300 transition-all w-full py-2 rounded-lg">Change dates</button>
                                <button className="mt-2 bg-primary text-white hover:scale-105 duration-300 transition-all w-full py-2 rounded-lg" onClick={()=>{
                                    handlePay(pdetails)
                                      
                                }}>Confirm and Pay</button>
                            </div>
                        </div>
                    </div>
    
                    {/* map */}
    
                    <div className="">
                        <h1>Map</h1>
                        {isLoaded && (
                                    <GoogleMap
                                        mapContainerStyle={{ height: "400px", width: "100%" }}
                                        center={pos}
                                        zoom={14}
                                        // onClick={onMapClick}
                                    >
                                       <Marker
                                        position={pos}
                                        draggable={false}
                                        icon={{
                                            url: '/assets/homemap2.svg',
                                            scaledSize: new google.maps.Size(50, 50), // Adjust size as needed
                                        }}
                                    />
                                    </GoogleMap>
                                )}
                    </div>


                    {/* <BookingDetails isOpen = {open} onClose={HandleClose} property = {propertyDetails} /> */}
    
                </div>
                ) : ('')
               
            ) 
            
            }
             <ImageModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                images={propertyDetails ? propertyDetails?.photos : pdetails.placeImages} />
           
        </Section>
    )
}

export default PropertyDetails