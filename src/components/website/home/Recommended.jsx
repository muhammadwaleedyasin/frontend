'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdFavorite, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineFavoriteBorder } from 'react-icons/md';
import Section from '@/components/shared/Section';
import axios from 'axios';
import { backend_url } from '@/libs/data';
import { useRouter } from 'next/navigation';

// Arrow components remain unchanged
function SampleNextArrow(props) {
    const { onClick, currentSlide, slideCount } = props;
    const isLastSlide = currentSlide === slideCount - 1;

    return (
        <div
            onClick={!isLastSlide ? onClick : undefined}
            className={`absolute top-[6rem] md:-right-12 right-0 z-40 ${isLastSlide ? 'hidden' : 'md:text-gray-400 cursor-pointer text-gray-200'}`}
        >
            <MdKeyboardArrowRight className='text-5xl' />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { onClick, currentSlide } = props;
    const isFirstSlide = currentSlide === 0;

    return (
        <div
            onClick={!isFirstSlide ? onClick : undefined}
            className={`absolute top-[6rem] md:-left-12 z-40 ${isFirstSlide ? 'hidden' : 'md:text-gray-400 cursor-pointer text-gray-200'}`}
        >
            <MdKeyboardArrowLeft className='text-5xl' />
        </div>
    );
}

const Recommended = () => {
    const [favorites, setFavorites] = useState(new Set());
    const [data, setData] = useState();
    const router = useRouter()

    const GetRec = async () => {
        try {
            const res = await axios.get(`${backend_url}/api/user/getrecommendations`);
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        GetRec();
    }, []);

    const PropertyType = (type) => {
        if (type === "room" || type === "studio") {
            return "Hotel";
        } else if (type === 'villa') {
            return "Villa";
        } else if (type === "suite" || type === "appartment" || type === "maisonette" || type === "home") {
            return "Appartment";
        }
        return "Unknown Type"; // Fallback case
    };

    const toggleFavorite = (id) => {
        setFavorites((prevFavorites) => {
            const newFavorites = new Set(prevFavorites);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return newFavorites;
        });
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,  // Show 5 items in a row
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,  // Show 3 items for medium screens
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,  // Show 1 item for small screens
                    slidesToScroll: 1,
                },
            },
        ],
    };
    function deductDates(dateStop, dateStart) {
        const date1 = new Date(dateStop);
        const date2 = new Date(dateStart);
        const timeDifference = date1.getTime() - date2.getTime();
        const dayDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
        return dayDifference;
    }
    const navigateToPropertyDetails = (pcode,rcode,price,location,id,basePrice,pid) => {
        router.push(`/property-details?pcode=${pcode}&where=${'CY'}&pid=${pid}&rateId=${id}&bp=${basePrice}&rcode=${rcode}&nights=${'3'}&checkin=${'10/8/2024'}&checkout=${'10/15/2024'}&tp=${deductDates('10/15/2024','10/8/2024')*price}&guests=${'4'}&lat=${location.lat}&lon=${location.lon}`);
    };

    return (
        <Section>
            <div className="max-w-6xl mx-auto">
                <h2 className="md:text-4xl text-2xl font-semibold py-3 md:py-8">Recommendations For You</h2>
                <Slider {...settings}>
                        {data ? data.map((property, index) => (
                            <div
                                key={index}
                                className="py-2 px-3 cursor-pointer"
                                onClick={() => navigateToPropertyDetails(property.propertyCode, property.type, property.retail.price, property.location, property.id, property.retail.price)}
                            >
                                <div className="bg-white rounded-3xl shadow overflow-hidden w-full">
                                    <div className="relative w-full" style={{ height: '200px' }}>
                                        <Image
                                            width={1920}
                                            height={1080}
                                            src={property.url.photoL}
                                            alt={property.room}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute top-0 right-0 p-3">
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevents the card click event from triggering
                                                    toggleFavorite(index);
                                                }}
                                                className="cursor-pointer bg-gray-300 md:h-7 md:w-7 h-9 w-9 rounded-full flex justify-center items-center"
                                            >
                                                {favorites.has(index) ? (
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
                                                <h3 className="md:text-md text-sm font-medium">{PropertyType(property.unit_type)} in {property.location.name}</h3>
                                                <span className="text-yellow-500 text-2xl md:text-lg">★{property.rating}.0</span>
                                            </div>
                                            <div className="flex items-center justify-start w-full">
                                                <p className="text-sm text-gray-400 text-left truncate">{property.room}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center py-1 gap-4"></div>
                                        <div className="flex items-center py-1 justify-between">
                                            <div className="flex gap-2">
                                                <p className="text-black md:text-sm text-lg font-semibold">€{property.retail.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : ''}
                </Slider>
            </div>
        </Section>
    );
};

export default Recommended;
