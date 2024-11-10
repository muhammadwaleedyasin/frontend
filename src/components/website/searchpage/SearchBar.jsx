'use client';

import Button from '@/components/shared/Button';
import CustomCalenderSelect from '@/components/shared/CustomCalenderSelect';
import CustomInputSelect from '@/components/shared/CustomInputSelect';
import CustomSelect from '@/components/shared/CustomSelect';
import useCountries from '@/hooks/useCountries';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5';

const SearchBar = ({ onSortChange,when,where,guests,country,region,propertyLength,checkin,checkout }) => {
    const [activeButton, setActiveButton] = useState(null);
    const [sortOrder, setSortOrder] = useState('lowToHigh'); // Default to 'Low to High'
    const [selectedRegion, setSelectedRegion] = useState(''); 
    const dropdownRef = useRef(null);
    const { getAll,getByValue,getRegionCodeByName } = useCountries(); 
    const regionCode = getRegionCodeByName(region);
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        onSortChange(order); // Notify parent about the sort order change
    };
    const [selectedOptions, setSelectedOptions] = useState({
        where: where,
        when: when,
        guests: guests
    });
   // console.log('jj',selectedOptions.where)

    const router = useRouter()
    const [openDropdown, setOpenDropdown] = useState(null);

   
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

    const closeDropdown = (dropdownName) => {
        if (openDropdown === dropdownName) {
            setOpenDropdown(null); 
        }
    };
    const guestOPtions = [
        ...Array.from({ length: 20 }, (_, i) => ({
            value: `${i + 1}`,
            label: `${i + 1}`
        })),
    ];

    const HandleSearch = ()=>{
        const selectedCountry = getByValue(selectedOptions.where);
        router.push(`/property-search?where=${selectedOptions.where}&lat=${selectedCountry.latlng[0]}&lon=${selectedCountry.latlng[1]}&when=${selectedOptions.when}&guests=${selectedOptions.guests}&country=${selectedCountry.label}&region=${selectedRegion}`);
    }


    
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

    return (
        <div className="">
            <div className="md:flex md:justify-center md:px-0 px-5">
            <div ref={dropdownRef} className='bg-[#C7C7C7] bg-opacity-45 flex flex-col md:flex-row md:gap-2 items-center mt-2 lg:rounded-full rounded-md px-3 py-2'>
            <div className='w-full md:w-auto flex gap-2 items-center px-2 text-sm md:text-base md:border-r border-gray-400'>
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
            
            <div className='w-full md:w-auto flex gap-2 items-center px-2 text-sm md:text-base md:border-r border-gray-400 mt-2 md:mt-0'>
                <CustomCalenderSelect
                checkin={checkin} 
                checkout={checkout}
                selectedValue={selectedOptions.when}
                onChange={(value) => handleSelectChange('when', value)}
                defaultLabel="When?"
                isOpen={openDropdown === 'when'}
                onToggle={() => handleDropdownToggle('when')}
                isDateRange={true}
                closeDropdown={()=>closeDropdown('when')}
                type='search'


                />
            </div>

            <div className='w-full md:w-auto flex gap-2 items-center px-2 text-sm md:text-base md:border-r border-gray-400 mt-2 md:mt-0'>
                <CustomSelect
                options={guestOPtions}
                selectedValue={selectedOptions.guests}
                onChange={(value) => handleSelectChange('guests', value)}
                defaultLabel="Guests"
                isOpen={openDropdown === 'guests'}
                onToggle={() => handleDropdownToggle('guests')}
                />
            </div>

            <button className='h-8 w-[90%] md:h-7 md:w-7 px-2 md:rounded-full rounded-md bg-blue-500 text-white flex items-center justify-center mt-2 md:mt-0'
                onClick={() => 
                {
                    closeDropdown('when')
                    HandleSearch()

                }}>
                <IoSearchOutline className="text-base" />
            </button>
            </div>

                {/* <div className='bg-[#C7C7C7] md:gap-2 bg-opacity-45 flex  items-center flex-row mt-2 rounded-full  px-3 py-2'>
                    <div className='md:w-auto flex gap-2 items-center w-full px-2 md:text-base text-sm  md:border-r border-gray-400'>
                        {where} <FaAngleDown />
                    </div>
                    <div className='md:w-auto flex gap-2 items-center md:text-base text-sm w-full  px-2 md:border-r border-gray-400'>
                        {when} <FaAngleDown />
                    </div>
                    <div className=' md:w-auto w-full flex gap-2 items-center md:text-base text-sm px-2 md:border-r border-gray-400'>
                        {guests} guests <FaAngleDown />
                    </div>

                    <button className="md:h-7 md:w-7 h-8 w-8 px-2 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        <IoSearchOutline className="text-base" />
                    </button>
                </div> */}
            </div>

            <div className="max-w-6xl md:px-3 px-8 space-y-3 md:pt-7 pt-3 mx-auto">
                <h1 className='text-black text-lg md:text-xl font-semibold'>{where}:{propertyLength} properties found to stay</h1>
                <h1 className='text-black text-base font-normal'>Stop Dreaming, Start Packing!</h1>
                <div className="">
                    {/* <div className="flex border border-gray-300 bg-gray-100 rounded-full w-[89%] md:w-[28.7%]  items-center">
                        <button
                            className='border-r border-gray-300 bg-gray-100 px-4 rounded-full py-1 text-sm'
                            disabled
                        >
                            Sort By
                        </button>
                        <button
                            onClick={() => handleSortChange('highToLow')}
                            className={`border-r border-gray-300 bg-gray-100 px-4 rounded-full py-1 text-sm ${sortOrder === 'highToLow' ? 'font-semibold' : ''}`}
                        >
                            Price highest
                        </button>
                        <button
                            onClick={() => handleSortChange('lowToHigh')}
                            className={`px-4 rounded-full py-1 text-sm ${sortOrder === 'lowToHigh' ? 'font-semibold' : ''}`}
                        >
                            Price lowest
                        </button>
                    </div> */}
                    {/* <div className="flex justify-center md:py-0 py-5 relative items-center">
                        <div className="px-4 justify-center md:absolute md:top-1  gap-5 flex">
                            <Button
                                label='Hotels'
                                style={`text-sm ${activeButton === 'Hotels' ? 'bg-primary text-white' : 'bg-transparent border !border-primary !text-primary'}`}
                                onClick={() => handleButtonClick('Hotels')}
                            />
                            <Button
                                label='Villas'
                                style={`text-sm ${activeButton === 'Villas' ? 'bg-primary text-white' : 'bg-transparent border !border-primary !text-primary'}`}
                                onClick={() => handleButtonClick('Villas')}
                            />
                            <Button
                                label='Apartments'
                                style={`text-sm ${activeButton === 'Apartments' ? 'bg-primary text-white' : 'bg-transparent !border !border-primary !text-primary'}`}
                                onClick={() => handleButtonClick('Apartments')}
                            />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
