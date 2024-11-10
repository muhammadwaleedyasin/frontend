import Image from 'next/image'
import React from 'react'
import home from '/public/assets/home.svg'
import hand from '/public/assets/hand.svg'
import users from '/public/assets/users.svg'
import vline from '/public/assets/vline.svg'
import Section from '@/components/shared/Section'

const Cards = () => {
    return (
        <>
            <div className="bg-primary py-8 bg-opacity-10">
                <Section>
                    <div className="">

                        <div className="mx-auto  py-4">
                            <h1 className='md:text-[40px] text-2xl py-2 font-[300] text-center'>Our Marketplace Performance</h1>
                            <p className='text-base md:w-[45%] md:mx-auto text-center font-[300] text-[#515050]'>Delivering exceptional results with over 20 years of industry experience, millions of bookings, and satisfied customers worldwide.</p>
                        </div>
                        <div className="flex flex-col w-full md:flex-row md:items-start items-center relative z-10 justify-between p-4 space-y-8 md:space-y-0 ">

                            {/* Left Section */}
                            <div className="flex gap-3 flex-col items-center text-center max-w-sm">
                                <div className="">
                                    <Image src={hand} alt='' className='z-20 relative' />
                                </div>
                                <div className="">
                                    <h3 className="text-lg">List with confidence</h3>
                                    <p className="text-sm text-[#515050]">
                                        Join thousands of property owners who trust us to showcase their homes. Our rigorous vetting process ensures that only the best properties are featured, attracting quality renters who respect and value your space.
                                    </p>
                                </div>
                            </div>

                            <div className="md:block hidden">
                                <Image src={vline} alt='' className='absolute z-0 w-[70%] mx-auto top-7 right-52' />
                            </div>

                            {/* Middle Section */}
                            <div className="flex flex-col gap-3 items-center text-center max-w-sm">
                                <div className="md:mt-12">
                                    <Image src={home} alt='' className='z-20 relative' />
                                </div>
                                <div className="">
                                    <h3 className="text-lg">Trusted by Thousands</h3>
                                    <p className="text-sm text-[#515050]">
                                        Benefit from our extensive marketing reach and industry expertise. We provide tools and insights to maximize your property&apos;s potential, helping you achieve the highest possible return on your investment.
                                    </p>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="flex flex-col gap-3 items-center text-center max-w-sm">
                                <div className="">
                                    <Image src={users} alt='' className='z-20 relative' />
                                </div>
                                <div className="">
                                    <h3 className="text-lg">Grow with us</h3>
                                    <p className="text-sm text-[#515050]">
                                        Join a thriving community with over 50,000 active users visiting our site daily. Our platform connects you with a global audience, increasing your chances of finding the perfect guests for your property.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    )
}

export default Cards