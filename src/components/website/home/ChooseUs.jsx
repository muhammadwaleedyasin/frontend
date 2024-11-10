import Section from '@/components/shared/Section';
import Image from 'next/image';
import React from 'react';
import arrowline from '/public/assets/arrowline.svg';
import arrowline2 from '/public/assets/arrowline2.svg';
import realstate from '/public/assets/realstate.svg';
import { MdOutlineArrowForward } from 'react-icons/md';
import Link from 'next/link';

const ChooseUs = () => {
    return (
        <>
            <div className="">
                <div className="flex items-center py-8 justify-center md:gap-16">
                    <Image src={arrowline} alt='' className='md:block hidden' />
                    <h1 className='text-primary text-4xl font-medium'>Why Choose Us?</h1>
                    <Image src={arrowline2} alt='' className='md:block hidden' />
                </div>
                <div className="bg-primary py-8 bg-opacity-10">
                    <Section>
                        <div className="md:w-5/6 md:mx-auto">
                            <div className="grid md:grid-cols-2 grid-cols-1 items-center justify-between gap-6">
                                <div className="space-y-8">
                                    <h1 className='text-black text-3xl font-[400]'>Why we are the Best?</h1>
                                    <p className='text-sm leading-6 text-[#868686] font-[300]'>
                                        At RentPrivateVillas, we prioritize your comfort and satisfaction, offering a curated selection of over five million luxurious villas worldwide. With 20 years of experience, our trusted team ensures that every property meets the highest standards of quality and privacy. We provide personalized customer service, assisting you at every step, from booking to checkout. Whether you&apos;re seeking a peaceful retreat or an extravagant escape, our diverse portfolio guarantees an unforgettable experience tailored to your needs. Choose us for a seamless and stress-free rental experience in some of the world&apos;s most stunning locations.
                                    </p>
                                    <Link href={'/aboutus'} className='bg-primary w-[25%]  hover:scale-105 duration-300 transition-all py-3 flex gap-1 items-center px-4 text-white rounded'>Learn More<MdOutlineArrowForward /> </Link>
                                </div>
                                <div className="flex justify-end">
                                    <Image src={realstate} alt='' className='h-[60vh]' />
                                </div>
                            </div>
                        </div>
                    </Section>
                </div>
            </div>
        </>
    )
}

export default ChooseUs