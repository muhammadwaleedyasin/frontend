import React from 'react'
import img1 from '../../../../public/assets/propertyImg.png'
import Image from 'next/image'
import { IoStar } from "react-icons/io5";
import Section from '@/components/shared/Section';


const RentedProperty = () => {

    const data = [
        { img: img1, name: 'Apartment Haus Gausteur', rating: '4.9', review: '50', adress: 'Sankht Glantrich, Austria', price: '€1580' },
        { img: img1, name: 'Apartment Haus Gausteur', rating: '4.9', review: '50', adress: 'Sankht Glantrich, Austria', price: '€1580' },
        { img: img1, name: 'Apartment Haus Gausteur', rating: '4.9', review: '50', adress: 'Sankht Glantrich, Austria', price: '€1580' },
        { img: img1, name: 'Apartment Haus Gausteur', rating: '4.9', review: '50', adress: 'Sankht Glantrich, Austria', price: '€1580' },
        { img: img1, name: 'Apartment Haus Gausteur', rating: '4.9', review: '50', adress: 'Sankht Glantrich, Austria', price: '€1580' },
        { img: img1, name: 'Apartment Haus Gausteur', rating: '4.9', review: '50', adress: 'Sankht Glantrich, Austria', price: '€1580' },
        { img: img1, name: 'Apartment Haus Gausteur', rating: '4.9', review: '50', adress: 'Sankht Glantrich, Austria', price: '€1580' },
    ]

    return (
        <div className="bg-white rounded-lg py-3  min-h-screen">
            <Section>
                <div className="max-w-3xl mx-auto">
                    <div className="">
                        <h1 className='text-primary font-medium px-2 my-6'>Rented properties</h1>
                    </div>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 my-8 gap-5'>
                        {
                            data.map((e, i) => (
                                <div key={i} className='flex flex-col bg-white shadow-lg rounded-3xl' >
                                    <div className='w-full h-full'>
                                        <Image alt='' src={e.img} className='rounded-3xl w-full h-full' />
                                    </div>
                                    <div className='px-3 py-3 flex flex-col gap-1' >
                                        <div className='flex items-center gap-1'>
                                            <div className='text-[#FEB02B] flex items-center text-base md:text-[11px]'>
                                                <IoStar />
                                                <IoStar />
                                                <IoStar />
                                                <IoStar />
                                                <IoStar />
                                            </div>
                                            <h1 className='md:text-[9px] text-base font-semibold'>{e.name}</h1>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <div className='bg-primary text-white py-1 px-2 rounded-lg text-sm md:text-[9px] ' >
                                                {e.rating}/5
                                            </div>
                                            <p className='md:text-[10px] text-sm font-medium'>{e.review} Reviews</p>
                                        </div>
                                        <div className='flex justify-between py-1 items-center gap-2'>
                                            <p className='text-[#AAAAAA] text-base md:text-[10px]'>{e.adress}</p>
                                            <h1 className='text-black md:text-sm text-base font-semibold' >{e.price}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Section>
        </div>
    )
}

export default RentedProperty
