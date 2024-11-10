'use client';
import Section from '@/components/shared/Section';
import Button from '@/components/shared/Button';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import hotels from '/public/assets/hotels.png';
import hotel from '/public/assets/hotel.png';
import hero from '/public/assets/hero.svg';
import CustomSelect from '../../shared/CustomSelect';
import { IoSearchOutline } from "react-icons/io5";
import useCountries from '@/hooks/useCountries';
import CustomInputSelect from '@/components/shared/CustomInputSelect';
import CustomCalenderSelect from '@/components/shared/CustomCalenderSelect';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';


const HeroSection = () => {
    const [activeButton, setActiveButton] = useState('Hotels');
    const dropdownRef = useRef(null);
    const [selectedRegion, setSelectedRegion] = useState(''); 
    const [selectedOptions, setSelectedOptions] = useState({
        where: '',
        when: '',
        guests: ''
    });
    const router = useRouter()
    const [openDropdown, setOpenDropdown] = useState(null);
    const user = useSelector((state) => state.user.user);
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const { getAll,getByValue, } = useCountries(); 
    const whereOptions = getAll(); 
    

    const handleSelectChange = (field, value) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [field]: value,
        }));
        setOpenDropdown(null); 
    };

    useEffect(()=>{
        if(selectedOptions.where)
        {
            closeDropdown('where')
        }
       

    },[selectedOptions.where])

    const guestOptions = [
        ...Array.from({ length: 20 }, (_, i) => ({
            value: `${i + 1}`,
            label: `${i + 1}`
        })),
        { value: '20+', label: '20+' }
    ];
    
    const closeDropdown = (dropdownName) => {
        if (openDropdown === dropdownName) {
            setOpenDropdown(null); 
        }
    };
    

    const handleDropdownToggle = (dropdownName) => {
        setOpenDropdown(prev => (prev === dropdownName ? null : dropdownName)); 
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpenDropdown(null); // Close the dropdown when clicking outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const HandleSearch = () => {
        const selectedCountry = getByValue(selectedOptions.where);
        console.log('Selected Country:', selectedCountry);
        if (!selectedCountry) {
            console.error('No country found for the selected option!');
            return;
        }
        if (!selectedCountry.latlng) {
            console.error('LatLng not found for the selected country!');
            return;
        }
        router.push(`/property-search?where=${selectedOptions.where}&lat=${selectedCountry.latlng[0]}&lon=${selectedCountry.latlng[1]}&when=${selectedOptions.when}&guests=${selectedOptions.guests}&country=${selectedCountry.label}&region=${selectedRegion}&email=${user.email}`);
    };
    

    const heroImage = {
        'Hotels': hotels,
        'Villas': hero,
        'Apartments': hotel
    }[activeButton];

    return (
        <div className="py-7">
            <Section>
                <div className="space-y-6">
                    <div className="px-4 justify-center gap-5 flex">
                        <Button
                            label='Hotels'
                            style={`px-6 !text-sm ${activeButton === 'Hotels' ? 'bg-primary text-white' : 'bg-transparent border !border-primary !text-primary'}`}
                            onClick={() => handleButtonClick('Hotels')}
                        />
                        <Button
                            label='Villas'
                            style={`px-6 !text-sm ${activeButton === 'Villas' ? 'bg-primary text-white' : 'bg-transparent border !border-primary !text-primary'}`}
                            onClick={() => handleButtonClick('Villas')}
                        />
                        <Button
                            label='Apartments'
                            style={`!text - sm ${activeButton === 'Apartments' ? 'bg-primary text-white' : 'bg-transparent !border !border-primary !text-primary'}`}
                            onClick={() => handleButtonClick('Apartments')}
                        />
                    </div>
                    <div className="relative flex justify-center">
                        <Image
                            src={heroImage}
                            alt="Hero Image"
                            className='h-[72vh] md:w-auto w-full md:object-contain object-cover'
                            style={{ borderRadius: '3rem' }}
                        />
                        <div className='absolute inset-0 text-white  px-4 flex flex-col md:w-full  right-0 md:mx-auto items-center  justify-center text-center'>
                            <div className='flex 2xl:w-2/3 2xl:pl-7 md:w-3/5 mx-auto'>
                                <h1 className='font-semibold shadow lg:text-4xl md:text-3xl sm:text-2xl text-xl'>
                                    STOP DREAMING START PACKING!
                                </h1>
                            </div>
                            <div ref={dropdownRef} className='bg-[#6c69692f] backdrop-blur-sm flex xl:pl-16 md:items-center md:flex-row flex-col lg:w-[90%] md:w-full sm:w-[70%] w-[100%] 2xl:max-w-6xl max-w-5xl mt-2 md:rounded-full rounded-md py-4 px-3'>
                                <div className='flex-1 md:w-auto w-full md:px-4 md:border-r border-white'>
                                    <CustomInputSelect
                                    selectedRegion={selectedRegion}
                                    setSelectedRegion={setSelectedRegion}
                                        options={whereOptions} 
                                        selectedValue={selectedOptions.where}
                                        onChange={(value) => handleSelectChange('where', value)}
                                        defaultLabel="Where to?"
                                        isOpen={openDropdown === 'where'}
                                        onToggle={() => handleDropdownToggle('where')}
                                        closeDropdown={()=>closeDropdown('where')}
                                    />
                                </div>
                                <div className='flex-1 md:w-auto md:px-4 w-full md:border-r border-white'>
                                    <CustomCalenderSelect
                                        //options={whereOptions}
                                        selectedValue={selectedOptions.when}
                                        onChange={(value) => handleSelectChange('when', value)}
                                        defaultLabel="When?"
                                        isOpen={openDropdown === 'when'}
                                        onToggle={() => handleDropdownToggle('when')}
                                        isDateRange={true}
                                        closeDropdown={()=>closeDropdown('when')}
                                        type='main'

                                    />
                                </div>
                                <div className='flex-1 md:w-auto md:px-4 w-full md:border-r border-white'>
                                    <CustomSelect
                                        options={guestOptions}
                                        selectedValue={selectedOptions.guests}
                                        onChange={(value) => handleSelectChange('guests', value)}
                                        defaultLabel="Guests"
                                        isOpen={openDropdown === 'guests'}
                                        onToggle={() => handleDropdownToggle('guests')}
                                    />
                                </div>
                                <button className='lg:ml-32 md:ml-12 ml-0 flex items-center md:justify-normal justify-center gap-3 pl-6 pr-8 py-3 md:w-auto w-full rounded-full bg-[#53C0FF] text-white text-lg'
                                onClick={()=>{HandleSearch()}}>
                                    <IoSearchOutline className="text-xl md:block hidden" />
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default HeroSection;
