import Section from '@/components/shared/Section';
import Image from 'next/image'
import React from 'react'
import master from '/public/assets/master.svg'
import bitcoin from '/public/assets/bitcoin.svg'
import visa from '/public/assets/visa.svg'
import revolut from '/public/assets/revolut.svg'

const Payment = () => {
    return (
        <>
            <div className="py-10">
                <Section>
                    <div className="max-w-6xl space-y-4 md:px-4 mx-auto">
                        <h1 className='md:text-4xl  font-semibold'>Payment Methods</h1>
                        <div className="flex flex-row  md:gap-0  py-4 items-center justify-center">
                            <Image src={master} alt='' className='md:h-16 h-8' />
                            <Image src={bitcoin} alt='' className='md:h-16 h-8' />
                            <Image src={visa} alt='' className='md:h-10 h-6' />
                            <Image src={revolut} alt='' className='md:h-10 h-6' />
                        </div>
                    </div>
                </Section>
            </div>
        </>
    )
}

export default Payment