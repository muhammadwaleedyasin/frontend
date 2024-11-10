'use client'
import React, { useState } from 'react'
import Section from '../shared/Section'
import { useSelector } from 'react-redux';
import WithdrawForm from './WithdrawForm';
import toast from 'react-hot-toast';

const Wallet = () => {
  const owner = useSelector((state) => state.owner.owner);
  const [isOpen,setIsOpen] = useState(false)
   
  const HandleClose = ()=>{
    setIsOpen(false)
  }

  

    return (
        <>
            <div className="bg-white rounded-lg py-3  h-screen">
                <Section>

                    <div className="">
                        <div className="max-w-6xl mx-auto py-8">
                            <div className="space-y-2 px-3">
                                <h1 className='text-primary font-semibold text-3xl'>Payment Methods</h1>
                                <p className='text-primary text-sm md:text-lg'>Digital highly secured payment gateaway</p>
                            </div>
                            <div className="flex justify-center items-end pt-20">
                                <div className="bg-[#F1F1F1] h-24 rounded-2xl w-56 shadow-md flex flex-col justify-center text-center">
                                    <h1 className='text-primary font-medium text-2xl'>€{owner?.earnings}</h1>
                                    <p className='text-primary  text-sm'>Total Earnings</p>
                                </div>
                            </div>
                            <div className="flex justify-center py-4" onClick={()=>{
                                if(owner?.earnings<50)
                                {
                                    toast.error("You should have minimum €50 for withdraw")
                                    return
                                }
                                setIsOpen(true)
                            }}>
                                <button className='bg-primary text-sm px-4 shadow-md py-1 rounded-full text-white'>Withdraw</button>
                            </div>
                        </div>
                    </div>
                    <WithdrawForm isOpen={isOpen} onClose={HandleClose} amount={owner?.earnings} ownerId={owner._id}/>
                </Section>
            </div>
        </>
    )
}

export default Wallet