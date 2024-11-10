'use client';

import React from 'react';
import house1 from '/public/assets/house1.svg';
import house2 from '/public/assets/house2.svg';
import house3 from '/public/assets/house3.svg';
import italy from '/public/assets/Italy.svg';
import spain from '/public/assets/spain.svg';
import cyprus from '/public/assets/cyprus.svg';
import switzerland from '/public/assets/switzerland.svg';
import Image from 'next/image';
import Section from '@/components/shared/Section';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Ensure this is imported
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';


function SampleNextArrow(props) {
    const { onClick, currentSlide, slideCount } = props;
    const isLastSlide = currentSlide === slideCount - 1;

    return (
        <div
            onClick={!isLastSlide ? onClick : undefined}
            className={`absolute top-[5.7rem] md:-right-12 right-0 z-40 ${isLastSlide ? 'hidden' : 'md:text-gray-400 cursor-pointer text-gray-200'}`}
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
            className={`absolute top-[5.7rem]  md:-left-12  z-40 ${isFirstSlide ? 'hidden' : 'md:text-gray-400 cursor-pointer text-gray-200'}`}
        >
            <MdKeyboardArrowLeft className='text-5xl' />
        </div>
    );
}

const TopCountries = () => {
    const settings = {
        infinite: false,
        slidesToScroll: 1,
        slidesToShow: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1440, // Medium screens
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const countries = [
        { name: 'Cyprus', imageSrc: cyprus },
        { name: 'Austria', imageSrc: house2 },
        { name: 'Spain', imageSrc: spain },
        { name: 'Italy', imageSrc: italy },
        { name: 'Switzerland', imageSrc: switzerland },

    ];

    return (
        <Section>
            <div className="py-6 max-w-6xl mx-auto">
                <h2 className="md:text-4xl  text-2xl font-semibold py-3">Top Countries</h2>
                <Slider {...settings}>
                    {countries.map((country, index) => (
                        <div key={index} className="p-2">
                            <div className="bg-white rounded-3xl shadow overflow-hidden">
                                <Image
                                    src={country.imageSrc}
                                    alt={country.name}
                                    className="w-full h-auto object-cover"
                                />
                                <div className="p-4">
                                    <p className="text-start text-2xl py-2 font-medium">{country.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </Section>
    );
};

export default TopCountries;
