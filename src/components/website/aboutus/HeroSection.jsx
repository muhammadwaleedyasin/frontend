import Section from '@/components/shared/Section';
import Image from 'next/image'
import React from 'react'
import about from '/public/assets/about.svg'

const HeroSection = () => {
    return (
        <>
            <div className="bg-primary py-10">
                <Section>
                    <div className="grid md:grid-cols-2 items-center md:w-5/6 w-full md:mx-auto grid-cols-1">
                        <div className="space-y-3">
                            <h1 className='md:text-[40px] text-3xl font-bold text-white'><span className='text-[#004A8B] text-2xl md:text-[38px]'>This is</span> RentPrivateVillas</h1>
                            <p className='text-2xl font-[200] leading-[2.8rem]'>Founded in 2005, Rentprivatevillas is a top luxury rental company in Cyprus, offering over 30,000 properties globally. We provide excellent service to guests and help owners maximize returns. Each property is carefully selected and vetted to ensure a prestige experience, guaranteeing an exceptional stay.</p>
                        </div>
                        <div className="">
                            <Image src={about} alt='' />
                        </div>
                    </div>
                </Section>
            </div>
        </>
    )
}

export default HeroSection