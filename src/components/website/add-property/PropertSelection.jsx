'use client'
import Section from '@/components/shared/Section'
import Image from 'next/image'
import React from 'react'
import house from '/public/assets/house.svg'
import villa from '/public/assets/villa.svg'
import appartment from '/public/assets/appartment.svg'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { propertyForm } from '@/recoil/propertyForm'

const PropertSelection = () => {
    const [formState, setFormState] = useRecoilState(propertyForm);

    const handlePropertyTypeSelection = (type) => {
        setFormState((prevState) => ({
            ...prevState,
            propertytype: type,
        }));
    };
    return (
        <>
            <div className="bg-primary">
                <Section>
                    <div className="max-w-6xl py-6 md:px-12 mx-auto">
                        <div className="">
                            <h1>To get started, select the type of property you want to list:</h1>
                        </div>
                        <div className="grid md:grid-cols-3 gap-5 grid-cols-1 py-16 max-w-4xl mx-auto">
                            <div className="bg-white justify-center shadow-md flex flex-col items-center p-3 rounded-2xl">
                                <Image src={house} alt='house' className='h-40' />
                                <Link href='/property-details-form'
                                 onClick={() => handlePropertyTypeSelection('home')} 
                                 className='bg-primary px-9 text-white hover:scale-105 duration-300 rounded-full py-1'>Home</Link>
                            </div>
                            <div className="bg-white justify-center shadow-md flex flex-col items-center p-3 rounded-2xl">
                                <Image src={villa} alt='house' className='h-40' />
                                <Link href='/property-details-form'
                                 onClick={() => handlePropertyTypeSelection('villa')} 
                                 className='bg-primary px-9 text-white hover:scale-105 duration-300 rounded-full py-1'>Villas</Link>
                            </div>
                            <div className="bg-white justify-center shadow-md flex flex-col items-center p-3 rounded-2xl">
                                <Image src={appartment} alt='house' className='h-40' />
                                <Link href='/property-details-form'
                                 onClick={() => handlePropertyTypeSelection('appartment')} 
                                 className='bg-primary px-5 text-white hover:scale-105 duration-300 rounded-full py-1'>Apartment</Link>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    )
}

export default PropertSelection