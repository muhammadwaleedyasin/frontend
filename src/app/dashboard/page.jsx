import PropertyCard from '@/components/dashboard/PropertyCard';
import Section from '@/components/shared/Section';
import React from 'react'
import { IoSearchOutline } from "react-icons/io5";


const Page = () => {

  const ballsData = [
    { name: 'Reservations', value: '0' },
    { name: 'Arrivals', value: '0' },
    { name: 'Departures', value: '0' },
    { name: 'Reviews', value: '0' },
  ]

  return (
    <div className='bg-white rounded-lg py-6' >
      <Section>
        <div className='flex justify-center' >
          <div className='bg-[#F1F1F1] shadow-md rounded-2xl xl:w-[43%] lg:w-[70%] w-full xl:px-10 px-4 py-2'>
            <div className='flex justify-center items-center md:gap-3 gap-3'>
              {
                ballsData.map((e, i) => (
                  <div key={i} className='flex flex-col items-center gap-2 '>
                    <div className='bg-primary text-white p-4 px-6 rounded-full shadow-lg' >{e.value}</div>
                    <p className='text-primary font-medium text-xs md:text-sm'>{e.name}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <h1 className='text-primary font-medium px-2 my-6'>Filter properties</h1>
        <div className='flex justify-center'>
          <div className='bg-[#F1F1F1] rounded-xl flex items-center xl:w-[30%] lg:w-[45%] sm:w-[55%] w-[80%] gap-2  px-4 py-2'>
            <input type="text" className='px-2 text-sm w-full bg-transparent outline-none' placeholder='Filter by property ID or Name' name="" id="" />
            <IoSearchOutline className='text-[#00000080]' />
          </div>
        </div>

        <div className='my-8'>
          <h1 className='text-primary px-2 font-medium'>Active properties</h1>
          <div className='flex justify-center' >
            <div className=' w-full' >
              <PropertyCard />
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default Page
