import PropertyCard from '@/components/dashboard/userdashboard/PropertyCard'
import Section from '@/components/shared/Section'
import React from 'react'


const page = () => {
    const ballsData = [
        { name: 'Total spent', value: '0€' },
        { name: 'Properties rented', value: '0' },
        { name: 'Points earned', value: '0' },
    ]
    return (
        <div className='bg-white rounded-lg py-6' >
            <Section>
                <div className='flex justify-center' >
                    <div className='bg-[#F1F1F1] shadow-md rounded-2xl xl:w-[50%] lg:w-[70%] w-full xl:px-10 px-4 py-2'>
                        <div className='flex justify-center sm:flex-nowrap flex-wrap items-center md:gap-10 gap-1 '>
                            {
                                ballsData.map((e, i) => (
                                    <div key={i} className='flex flex-col items-center gap-2 '>
                                        <div className='bg-primary text-white p-4 h-16 w-16 flex items-center justify-center rounded-full shadow-lg' >{e.value}</div>
                                        <p className='text-primary font-medium text-xs md:text-sm'>{e.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className='my-8'>
                    <h1 className='text-primary px-2 font-medium'>Recommended</h1>
                    <div className='flex justify-center' >
                        <div className='md:w-11/12 w-ful min-h-full' >
                            <PropertyCard />
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}

export default page