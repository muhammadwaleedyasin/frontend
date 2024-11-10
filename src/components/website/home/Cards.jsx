import Section from '@/components/shared/Section';
import Image from 'next/image'
import React from 'react'
import home from '/public/assets/home.svg'
import hand from '/public/assets/hand.svg'
import users from '/public/assets/users.svg'
import vline from '/public/assets/vline.svg'

const Cards = () => {
    return (
        <>
            <div className="bg-primary py-8 bg-opacity-10">
                <Section>
                    <div className="">

                        <div className="mx-auto  py-4">
                            <h1 className='md:text-4xl text-2xl py-2 font-medium text-center'>Our Marketplace Performance</h1>
                            <p className='text-base md:w-[47%] md:mx-auto text-center font-normal text-[#515050]'>Delivering exceptional results with over 20 years of industry experience, millions of bookings, and satisfied customers worldwide.</p>
                        </div>
                        <div className="flex flex-col md:flex-row relative z-10 items-center md:items-start justify-between p-4 space-y-8 md:space-y-0 ">


                            {/* Left Section */}
                            <div className="flex gap-3 flex-col jus items-center text-center max-w-sm">
                                <div className="">
                                    <Image src={hand} alt='' className='z-20 relative' />
                                </div>
                                <div className="">
                                    <h3 className="text-lg">Renting Since 2005</h3>
                                    <p className="text-sm text-[#515050]">
                                        With two decades of experience, RentPrivateVillas offers premium villa rentals. From romantic escapes to family getaways, we have the perfect property for your needs.
                                    </p>
                                </div>
                            </div>
                            <div className="md:block hidden">
                                <Image src={vline} alt='' className='absolute z-0 w-[70%] mx-auto top-7 right-52' />
                            </div>
                            {/* Middle Section */}
                            <div className="flex flex-col gap-3  items-center text-center max-w-sm">
                                <div className="md:mt-12">
                                    <Image src={home} alt='' className='z-20 relative' />
                                </div>
                                <div className="">
                                    <h3 className="text-lg">50k+ properties</h3>
                                    <p className="text-sm text-[#515050]">
                                        Our portfolio includes over fifty thousand plus properties worldwide, from cozy villas to luxury estates. Each property is carefully selected for comfort, privacy, and style.
                                    </p>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="flex flex-col gap-3 items-center text-center max-w-sm">
                                <div className="">
                                    <Image src={users} alt='' className='z-20 relative' />
                                </div>
                                <div className="">
                                    <h3 className="text-lg">Customer Service</h3>
                                    <p className="text-sm text-[#515050]">
                                        We deliver exceptional customer service to ensure your stay is seamless. Our team is available to help with bookings, special requests, and on-site needs at all times.
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