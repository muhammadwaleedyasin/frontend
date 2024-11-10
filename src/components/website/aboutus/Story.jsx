import Section from '@/components/shared/Section';
import Image from 'next/image'
import React from 'react'
import arrowline from '/public/assets/arrowline.svg'
import arrowline2 from '/public/assets/arrowline2.svg'
import woman from '/public/assets/woman.svg'
import { GiHearts } from "react-icons/gi";

const Story = () => {
    return (
        <>
            <div className="py-8">
                <Section>
                    <div className="">
                        <div className="flex items-center py-8 justify-center md:gap-16">
                            <Image src={arrowline} alt='' className='md:block hidden' />
                            <h1 className='text-primary text-4xl font-medium'>Our Story</h1>
                            <Image src={arrowline2} alt='' className='md:block hidden' />
                        </div>
                        <div className="md:text-center font-[300] text-xl space-y-3 py-4 md:w-4/5 md:mx-auto">
                            <p className=''>In <span className='text-[#004A8B]'>2004 Stephen & Sarah</span> made a decision to move abroad to Ayia Napa in Cyprus to offer their young family a better safer way of life.</p>
                            <p>
                                They started with a big goal of becoming the largest property management and rental company in Cyprus, they worked relentlessly and invested heavily to fulfill their dream and by <span className='text-[#004A8B]'>2010</span> they had achieved it.. The success of their rental website gave them the idea to offer clients the chance to book villas all over the world not just in Cyprus.
                            </p>
                            <p>
                                After taking 2 years to develop their own software. They created <span className='text-[#004A8B]'>24 Hour keys</span>, a software program designed specifically for property managers to run their business on a day to day basis and to create a network of property managers all over the world offering them a unique platform to advertise globally their portfolios of luxury holiday properties
                            </p>
                            <p>
                                Our team is now made up of Multi lingual speaking staff based around the world working 7 days a week helping and advising clients to make the best choice for there next vacation all across the world. <span className='text-[#004A8B]'>Rentprivatevillas</span> are the largest villa holiday specialist in Cyprus and we love what we do. We are proud of our reputation and passion for offering the very best villa holiday experiences.
                            </p>
                            <p>
                                The sad loss of <span className='text-[#004A8B]'>Sarah</span> in 2015 to Cancer was a devastating blow to all who knew her. <span className='text-[#004A8B]'>Sarah’s</span> unique compassion, devotion and willingness to help all her clients (friends) will be sorely missed but never forgotten and today the business still runs with the same ethics and commitment as <span className='text-[#004A8B]'>Sarah</span> had developed and cared about so much.
                            </p>
                            <p>
                                Our owner since <span className='text-[#004A8B]'>2005, Stephen Lee</span> together with his children <span className='text-[#004A8B]'>Chloe & Demby</span> provide us and our guests with continued protection and peace of mind, with <span className='text-[#004A8B]'>Sarah’s</span> ethos very much still at the centre of everything we do every day!
                            </p>
                        </div>
                        <div className="flex items-center py-8 justify-center md:gap-16">
                            <Image src={arrowline} alt='' className='md:block hidden' />
                            <h1 className='text-primary text-2xl md:text-4xl font-medium flex items-center gap-3'>God bless our Sarah <span className='text-red-800'><GiHearts /></span></h1>
                            <Image src={arrowline2} alt='' className='md:block hidden' />
                        </div>
                        <div className="flex items-center py-8 justify-center gap-16">
                            <Image src={woman} alt='' className='w-80 h-80' />
                        </div>
                    </div>
                </Section>
            </div>
        </>
    )
}

export default Story