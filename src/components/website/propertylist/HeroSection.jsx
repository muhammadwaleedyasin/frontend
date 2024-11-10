'use client'
import Image from 'next/image'
import React from 'react'
import people from '/public/assets/people.svg'
import continued from '/public/assets/continued.svg'
import Section from '@/components/shared/Section'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const HeroSection = () => {
    const router = useRouter()
    const isOwnerAuthenticated = useSelector((state) => state.ownerAuth.isOwnerAuthenticated)

    const HandleRedirect = ()=>{
        if(!isOwnerAuthenticated)
        {
            toast.error("please login to continue")
            return
        }
        router.push('/add-property')
    }
    return (
        <>
            <div className="bg-primary">
                <Section>
                    <div className="">
                        <div className="grid md:grid-cols-2 items-center justify-center  gap-4 grid-cols-1">
                            <div className="md:w-2/3 md:mx-auto md:py-2 py-4">
                                <h1 className='md:text-6xl text-xl md:text-start text-center md:leading-[4.5rem] font-[900] text-[#004A8B]'>
                                    Join us &amp; turn your space into a guest&apos;s dream stay!
                                </h1>
                            </div>
                            <div className="flex justify-end">
                                <Image src={people} alt='' />
                            </div>
                        </div>
                        <div className="flex justify-center py-4 ">
                            <button  onClick={()=>{HandleRedirect()}} className='flex items-center gap-2'>Continue <Image src={continued} alt=''/></button>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    )
}

export default HeroSection