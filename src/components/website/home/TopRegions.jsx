'use client';

import React from 'react';
import boat from '/public/assets/boat.svg';
import villas from '/public/assets/villas.svg';
import protaras from '/public/assets/protaras.svg';
import ayianapa from '/public/assets/ayianapa.svg';
import paphos from '/public/assets/paphos.svg';
import adriatic from '/public/assets/adriatic.svg';
import mykonos from '/public/assets/mykonos.svg';
import sea from '/public/assets/sea.svg';
import Image from 'next/image';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Ensure this is imported
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Section from '@/components/shared/Section';

function SampleNextArrow(props) {
    const { onClick, currentSlide, slideCount } = props;
    const isLastSlide = currentSlide === slideCount - 1;

    return (
        <div
            onClick={!isLastSlide ? onClick : undefined}
            className={`absolute top-[5.7rem]  md:-right-12 right-0 z-40 ${isLastSlide ? 'hidden' : 'md:text-gray-400 cursor-pointer text-gray-200'}`}
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

const TopRegions = () => {
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
        { name: 'Protaras', imageSrc: protaras },
        { name: 'Mykonos', imageSrc: mykonos },
        { name: 'Paphos', imageSrc: paphos },
        { name: 'Ayia Napa', imageSrc: ayianapa },
        { name: 'Adriatic', imageSrc: adriatic },
    ];

    return (
        <Section>
            <div className="py-6 max-w-6xl mx-auto">
                <h2 className="md:text-4xl  text-2xl font-semibold py-8">Top Regions</h2>
                <Slider {...settings}>
                    {countries.map((country, index) => (
                        <div key={index} className="p-2">
                            <div className="bg-white rounded-3xl shadow overflow-hidden">
                                <Image
                                    src={country.imageSrc}
                                    alt={country.name}
                                    className="object-cover h-auto w-full"
                                />
                                <div className="p-4 flex flex-col items-start">
                                    <p className="text-start text-2xl font-medium">{country.name}</p>
                                    <p>
                                    {country.name === "Mykonos" 
                                        ? "Greece" 
                                        : country.name === "Adriatic" 
                                        ? "Italy" 
                                        : "Cyprus"
                                    }
                                    </p>

                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </Section>
    );
};

export default TopRegions;
