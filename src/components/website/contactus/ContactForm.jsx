import React from 'react';
import Image from 'next/image';
import office from '/public/assets/office.svg';
import address from '/public/assets/address.svg';
import certificate from '/public/assets/certificate.svg';
import mail from '/public/assets/mail.svg';
import phone from '/public/assets/phone.svg';
import Section from '@/components/shared/Section';
import CustomInput from '@/components/shared/CustomInput';

const ContactForm = () => {
  return (
    <>
      <div className="relative"> {/* Set position relative to create a new stacking context */}
        <Section>
          <div className="relative justify-center bg-white flex p-6">
            <div className="flex flex-col gap-5 lg:flex-row items-center justify-center">
              {/* Contact Form */}
              <div className="bg-white md:p-10 md:pr-32 rounded-3xl relative md:left-20 shadow-custom w-full lg:w-4/5 md:mx-auto">
                <div className="py-6 space-y-3 p-6">
                  <h2 className="md:text-[40px] text-2xl font-bold text-primary">Get in touch!</h2>
                  <p className="text-black text-opacity-50">Let us know more about you</p>
                </div>
                <form className="space-y-4 p-6">
                  <div className="flex gap-4">
                    <div className="md:w-1/2">
                      <CustomInput placeholder='First name' type='text' inputStyles='!rounded-2xl !p-5' />
                    </div>
                    <div className="md:w-1/2">
                      <CustomInput placeholder='Last name' type='text' inputStyles='!rounded-2xl !p-5' />
                    </div>
                  </div>
                  <div className="">
                    <CustomInput placeholder='Email Address *' type='email' inputStyles='!rounded-2xl !p-5' />
                  </div>
                  <div className="">
                    <CustomInput placeholder='Phone Number' type='text' inputStyles='!rounded-2xl !p-5' />
                  </div>
                  <textarea
                    placeholder="Type in your Message *"
                    className="w-full  p-5 bg-[#C7C7C7] bg-opacity-30 shadow-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0890FF] h-24"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white px-7 py-3 rounded-full hover:bg-blue-600 transition"
                  >
                    Submit
                  </button>
                </form>
              </div>
              {/* Contact Info */}
              <div className="md:mb-10 md:w-1/2">
                <div className="bg-primary text-white p-6 md:right-[3rem] md:top-[15rem] rounded-3xl shadow-custom  z-30 relative">
                  <Image src={office} alt="Office Image" className="rounded-lg" />
                  <div className="space-y-2">
                    <div className="">
                      <div className="flex items-center gap-4">
                        <Image src={address} alt='' className='h-9 w-9' />
                        <h1 className='text-[28px] font-semibold text-white text-opacity-70'>Address</h1>
                      </div>
                      <div className='w-3/4 md:px-0 pl-4   mx-auto'>
                        <p className='text-white text-base text-opacity-50'>499 Cavo Greko Avenue 5296 Protaras, Cyprus</p>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex items-center gap-4">
                        <Image src={phone} alt='' className='h-8 w-8' />
                        <h1 className='text-[28px] font-semibold text-white text-opacity-70'>Telephone</h1>
                      </div>
                      <div className='w-3/4 md:px-0 pl-4  mx-auto'>
                        <p className='text-white text-opacity-50'>+357 23 725 922</p>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex items-center gap-4">
                        <Image src={mail} alt='' className='h-8 w-8' />
                        <h1 className='text-[28px] font-semibold text-white text-opacity-70'>Email</h1>
                      </div>
                      <div className='w-3/4 md:px-0 pl-4  mx-auto'>
                        <p className='text-white text-opacity-50'>support@rentprivatevillas.com</p>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex items-center gap-4">
                        <Image src={certificate} alt='' className='h-8 w-8' />
                        <h1 className='md:text-[28px] text-[20px] font-semibold text-white text-opacity-70'>Company Registration</h1>
                      </div>
                      <div className='w-3/4 md:px-0 pl-3  mx-auto'>
                        <p className='text-white text-opacity-50'>SCD. Rent Private Villas LTD <br />
                          <span>Reg. No.: H.E. 435622</span> <br />
                          VAT. NO.: 10435622M
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default ContactForm;
