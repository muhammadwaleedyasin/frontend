import Section from '@/components/shared/Section';
import Image from 'next/image'
import React from 'react'
import privacy from '/public/assets/privacy.svg'
import privacy1 from '/public/assets/privacy1.png'

const Privacy = () => {
    return (
        <>
            <div className="py-12">
                <Section>
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1  items-center  md:grid-cols-2">
                            <div className="flex">
                                <Image src={privacy} alt='' className='h-[60vh] md:block hidden' />
                                <Image src={privacy1} alt='' className='md:hidden block' />
                            </div>
                            <div className="space-y-5 md:py-2 py-4">
                                <h1 className='text-black text-2xl md:py-0 py-4 md:text-[35px] font-[400]'>Our Privacy and Space</h1>
                                <p className='text-sm leading-6 text-[#868686] font-[300]'>At RentPrivateVillas, we understand the value of privacy and the luxury of space. Each villa in our portfolio offers a serene, private environment where you can relax without distractions. From secluded beach retreats to expansive hillside estates, our properties provide the freedom to enjoy your surroundings in complete peace. Whether you’re vacationing with family or friends, our villas ensure ample space for everyone to unwind and create lasting memories.</p>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    )
}

export default Privacy