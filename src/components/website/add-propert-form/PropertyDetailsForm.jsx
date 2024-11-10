'use client'

import CustomInput from '@/components/shared/CustomInput'
import Section from '@/components/shared/Section'
import { entertainmentOptions, heatingAndAirConditioningOptions, householdOptions, leisureOptions, outdoorFacilitiesOptions, suitabilityOptions, tvLanguagesOptions } from '@/data'
import React, { use, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import useFormValidator from './FormValidations'
import axios from 'axios'
import useCountries from '@/hooks/useCountries'
import CustomInputSelect from '@/components/shared/CustomInputSelect'




const PropertyDetailsForm = ({ next,propertyDetails,setPropertyDetails}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
   
    const [selectedRegion, setSelectedRegion] = useState(''); 
    // const [errors, setErrors] = useState({});
    const [bedrooms, setBedrooms] = useState(1);
    const [editIndex, setEditIndex] = useState(null);
    const [position, setPosition] = useState({lat: 0 , lng: 0 });
    const [seasonalPrice, setSeasonalPrice] = useState({
        dates: { from: '', until: '' },
        nightlyPrice: '',
        minimumStay: '',
        acceptMultiple: false,
    });

    const [openDropdown, setOpenDropdown] = useState(null);

    
    const { getAll, getByValue,getAllCountryDetailsWithRegions } = useCountries()
    const regionOptions = getAll()
  const d = getAllCountryDetailsWithRegions()

   const [countryData,setCountryData] = useState(d)
     useEffect(()=>{
        if(propertyDetails.propertyDetails.country)
        {
            const selectedCountry = countryData.filter((country => country.countryCode === propertyDetails.propertyDetails.country))
  
            setPropertyDetails({
                ...propertyDetails,
                propertyPosition:{
                    lat: selectedCountry[0].lat,
                    lng: selectedCountry[0].lng,
                },
              
            })
        }

     },[propertyDetails.propertyDetails.country])

    // console.log("Prr",propertyDetails.propertyPosition)
    const handleModalOpen = (index = null) => {
        if (index !== null && propertyDetails.checkDetails.seasonalPricing[index]) {
            const selectedSeasonalPrice = propertyDetails.checkDetails.seasonalPricing[index];
            setSeasonalPrice({
                dates: selectedSeasonalPrice?.dates || { from: '', until: '' },
                nightlyPrice: selectedSeasonalPrice?.nightlyPrice || '',
                minimumStay: selectedSeasonalPrice?.minimumStay || '',
                acceptMultiple: selectedSeasonalPrice?.acceptMultiple || false,
            });
            setEditIndex(index);
        } else {
            setSeasonalPrice({
                dates: { from: '', until: '' },
                nightlyPrice: '',
                minimumStay: '',
                acceptMultiple: false,
            });
            setEditIndex(null);
        }
        setIsModalOpen(true);
    };


    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSaveSeasonalPrice = (event) => {
        event.preventDefault()
        if (editIndex !== null) {
            setPropertyDetails((prevDetails) => {
                const updatedPricing = [...prevDetails.checkDetails.seasonalPricing];
                updatedPricing[editIndex] = seasonalPrice;
                return {
                    ...prevDetails,
                    checkDetails: {
                        ...prevDetails.checkDetails,
                        seasonalPricing: updatedPricing,
                    },
                };
            });
        } else {
            setPropertyDetails((prevDetails) => ({
                ...prevDetails,
                checkDetails: {
                    ...prevDetails.checkDetails,
                    seasonalPricing: [...prevDetails.checkDetails.seasonalPricing, seasonalPrice],
                },
            }));
        }
        handleModalClose();
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSeasonalPrice((prevPrice) => ({
            ...prevPrice,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleDateChange = (e, type) => {
        setSeasonalPrice((prevPrice) => ({
            ...prevPrice,
            dates: {
                ...prevPrice.dates,
                [type]: e.target.value,
            },
        }));
    };



    const handleCheckboxesChange = (section, name, checked) => {
        setPropertyDetails((prevState) => ({
            ...prevState,
            indoorFacilities: {
                ...prevState.indoorFacilities,
                [section]: {
                    ...prevState.indoorFacilities[section],
                    [name]: checked
                }
            }
        }));
    };

    const handleCheckInChange = (e, type) => {
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            checkDetails: {
                ...prevDetails.checkDetails,
                checkIn: {
                    ...prevDetails.checkIn,
                    [type]: e.target.value,
                },
            },
        }));
    };


    const handleCheckOutChange = (e, type) => {
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            checkDetails: {
                ...prevDetails.checkDetails,
                checkOut: {
                    ...prevDetails.checkOut,
                    [type]: e.target.value,
                },
            },
        }));
    };

    const handleBasePriceChange = (e) => {
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            checkDetails: {
                ...prevDetails.checkDetails,
                basePrice: {
                    ...prevDetails.basePrice,
                    price: e.target.value,
                },
            },
        }));
    };

    const handleCurrencyChange = (e) => {
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            checkDetails: {
                ...prevDetails.checkDetails,
                basePrice: {
                    ...prevDetails.basePrice,
                    currency: e.target.value,
                },
            },
        }));
    };

    // Function to handle removing a bedroom
    const removeBedroom = (index) => {
        if (bedrooms > 1) {
            const updatedBedrooms = propertyDetails.roomDetails.bedrooms.filter((_, i) => i !== index);
            setPropertyDetails((prevState) => ({
                ...prevState,
                roomDetails: {
                    ...prevState.roomDetails,
                    bedrooms: updatedBedrooms
                }
            }));
            setBedrooms(prev => prev - 1);
        }
    };

    // Handle bedrooms selection change
    const handleBedroomChange = (e) => {
        const numberOfBedrooms = Number(e.target.value);
        setBedrooms(numberOfBedrooms);

        const updatedBedrooms = propertyDetails.roomDetails.bedrooms.slice(0, numberOfBedrooms);
        while (updatedBedrooms.length < numberOfBedrooms) {
            updatedBedrooms.push({ noOfbeds: '1', bedType: '', ensuit: false });
        }

        setPropertyDetails((prevState) => ({
            ...prevState,
            roomDetails: {
                ...prevState.roomDetails,
                bedrooms: updatedBedrooms
            }
        }));
    };


    // handle on change form
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const [fieldName, subFieldName, field] = name.split('.'); // Split into three parts

        setPropertyDetails((prevState) => {
            let updatedState = { ...prevState };

            if (fieldName === 'propertyDetails') {
                updatedState = {
                    ...updatedState,
                    propertyDetails: {
                        ...updatedState.propertyDetails,
                        [subFieldName]: type === 'checkbox' ? checked : value,
                    },
                };
            } else if (fieldName === 'roomDetails') {
                if (subFieldName === 'bedrooms') {
                    const index = parseInt(e.target.dataset.index, 10);
                    const field = e.target.dataset.field;

                    updatedState = {
                        ...updatedState,
                        roomDetails: {
                            ...updatedState.roomDetails,
                            bedrooms: updatedState.roomDetails.bedrooms.map((bedroom, i) =>
                                i === index
                                    ? { ...bedroom, [field]: type === 'checkbox' ? checked : value }
                                    : bedroom
                            ),
                        },
                    };
                } else {
                    updatedState = {
                        ...updatedState,
                        roomDetails: {
                            ...updatedState.roomDetails,
                            [subFieldName]: value,
                        },
                    };
                }
            } else if (fieldName === 'bathrooms') {
                updatedState = {
                    ...updatedState,
                    roomDetails: {
                        ...updatedState.roomDetails,
                        bathrooms: {
                            ...updatedState.roomDetails.bathrooms,
                            [subFieldName]: value,
                        },
                    },
                };
            } else if (fieldName === 'seats') {
                updatedState = {
                    ...updatedState,
                    roomDetails: {
                        ...updatedState.roomDetails,
                        seats: {
                            ...updatedState.roomDetails.seats,
                            [subFieldName]: value,
                        },
                    },
                };
            } else if (fieldName === 'indoorFacilities' && subFieldName === 'heatingAndAirConditioning') {
                updatedState = {
                    ...updatedState,
                    indoorFacilities: {
                        ...updatedState.indoorFacilities,
                        heatingAndAirConditioning: {
                            ...updatedState.indoorFacilities.heatingAndAirConditioning,
                            [field]: value, // Use the third part for the field name
                        },
                    },
                };
            }

            return updatedState;
        });
    };


    const HandleSuitabilityChange = (e) => {
        const { name, checked } = e.target;

        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            suitability: {
                ...prevDetails.suitability,
                [name]: checked,
            },
        }));
    };

    const handleOutoorFacilitiesChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPropertyDetails((prevDetails) => {
            if (type === 'checkbox') {
                if (name in prevDetails.outdoorFacilities.facilities) {
                    return {
                        ...prevDetails,
                        outdoorFacilities: {
                            ...prevDetails.outdoorFacilities,
                            facilities: {
                                ...prevDetails.outdoorFacilities.facilities,
                                [name]: checked
                            }
                        }
                    };
                } else if (name === 'privatePool' || name === 'partofLeasureResort') {
                    return {
                        ...prevDetails,
                        outdoorFacilities: {
                            ...prevDetails.outdoorFacilities,
                            [name]: checked
                        }
                    };
                }
            } else {
                if (name === 'extraInformation') {
                    return {
                        ...prevDetails,
                        outdoorFacilities: {
                            ...prevDetails.outdoorFacilities,
                            [name]: value
                        }
                    };
                } else if (['sizeWidth', 'sizeHeight', 'depthMin', 'depthMax'].includes(name)) {
                    const keyMap = {
                        sizeWidth: 'width',
                        sizeHeight: 'height',
                        depthMin: 'min',
                        depthMax: 'max',
                    };

                    const field = keyMap[name];

                    // Determine if updating size or depth
                    const isSize = name.includes('size');
                    const isDepth = name.includes('depth');

                    return {
                        ...prevDetails,
                        outdoorFacilities: {
                            ...prevDetails.outdoorFacilities,
                            heating: {
                                ...prevDetails.outdoorFacilities.heating,
                                [isSize ? 'size' : 'depth']: {
                                    ...(isSize ? prevDetails.outdoorFacilities.heating.size : prevDetails.outdoorFacilities.heating.depth),
                                    [field]: value,
                                },
                            },
                        },
                    };
                } else if (name === 'type') {
                    return {
                        ...prevDetails,
                        outdoorFacilities: {
                            ...prevDetails.outdoorFacilities,
                            heating: {
                                ...prevDetails.outdoorFacilities.heating,
                                type: value,
                            },
                        },
                    };
                }
            }
        });
    };

    const data = [
        { dates: '1 July - 31 August 2024', price: '€1,300.00', minStay: '7 nights', multiplesOf7: 'No' },
        { dates: '1 September - 30 September 2024', price: '€1,000.00', minStay: '7 nights', multiplesOf7: 'No' },
        { dates: '1 October - 31 October 2024', price: '€840.00', minStay: '7 nights', multiplesOf7: 'No' },
        { dates: '1 November - 30 November 2024', price: '€770.00', minStay: '7 nights', multiplesOf7: 'No' },
        { dates: '1 December 2024 - 28 February 2025', price: '€660.00', minStay: '7 nights', multiplesOf7: 'No' },
    ];



    const bedOptions = [
        { name: 'Select', value: '' },
        { name: 'Single bed', value: 'singleBed' },
        { name: 'Double bed', value: 'doubleBed' },
        { name: 'King size bed', value: 'kingSizeBed' },
        { name: 'Small double bed', value: 'smallDoubleBed' },
        { name: 'Single Sofa bed', value: 'singleSofaBed' },
        { name: 'Double sofa bed', value: 'doubleSofaBed' },
        { name: 'Bunk bed (sleep 2)', value: 'bunkBedSleep2' },
        { name: 'Bunk bed (sleep 3)', value: 'bunkBedSleep3' },
    ];

   
    const handleCountryChange=(event)=>{
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            propertyDetails: {
                 ...prevDetails.propertyDetails,
                 country:event.target.value,
               
            }
              
        }));
    }
    const handleRegionChange=(event)=>{
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            propertyDetails: {
                 ...prevDetails.propertyDetails,
                 region:event.target.value,
               
            }
              
        }));
    }
    
    const HandleGuestChange=(e)=>{
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            checkDetails: {
                 ...prevDetails.checkDetails,
                 guests: e.target.value,
               
            }
              
        }));

    }
    const HandleUnitIdChange=(e)=>{
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            checkDetails: {
                 ...prevDetails.checkDetails,
                 unitId: e.target.value,
               
            }
              
        }));
    }
    const HandleUnitDiscountChange=(e)=>{
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            checkDetails: {
                 ...prevDetails.checkDetails,
                 unitDiscount: e.target.value,
               
            }
              
        }));
    }
    const handleRatingChange=(e)=>{
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            propertyDetails: {
                 ...prevDetails.propertyDetails,
                 rating: e.target.value,
               
            }
              
        }));
    }

    const handleSelectChange = (field, value) => {
        const selectedCountry = getByValue(value);
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            propertyDetails: {
                 ...prevDetails.propertyDetails,
                 country: value,
               
            }
              
        }));
        
        setOpenDropdown(null); 
        
    };

    const selectedCountryData = countryData.find(country => country.countryCode === propertyDetails.propertyDetails.country);
    const regions = selectedCountryData ? selectedCountryData.regions : [];

    const closeDropdown = (dropdownName) => {
        if (openDropdown === dropdownName) {
            setOpenDropdown(null); 
        }
    };
    

    const handleDropdownToggle = (dropdownName) => {
        setOpenDropdown(prev => (prev === dropdownName ? null : dropdownName)); 
    };

    console.log("pp",propertyDetails)

    const requiredFields = [
        'propertyDetails.propertyName',
        'propertyDetails.country',
        'propertyDetails.address',
        'propertyDetails.zipCode',
        'propertyDetails.description',
        'roomDetails.seats.diningAreaSeats',
        'roomDetails.seats.livingAreaSeats',
        'checkDetails.basePrice.price',
       
    ];
    // { errors['propertyDetails.propertyName'] && <p className="text-rose-500 text-sm">{errors['propertyDetails.propertyName']}</p> }


    const { errors, validateForm } = useFormValidator(propertyDetails, requiredFields);

    // Handle form submission
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(propertyDetails)
        // if (!validateForm(propertyDetails)) {
        //     next();
        // }
        next();
    };

    return (
        <>
            <div className="">
                <Section>
                    <form className="max-w-6xl md:mx-auto md:p-8">
                        {/* Left Side - Form Inputs */}
                        <div className='space-y-10'>
                            <div className="p-4 rounded-lg shadow">
                                <h1 className="text-xl bg-gray-200 px-4 py-3 rounded font-medium ">Property details</h1>
                                <div className="md:px-4 py-5">
                                    <div className="py-2 md:w-2/3 w-full">
                                        <CustomInput
                                            isRequired={true}
                                            label='Property name'
                                            placeholder='Enter name of your property'
                                            labelStyles='!font-normal'
                                            inputStyles='!bg-[#FAFAFA] !rounded shadow'
                                            name='propertyDetails.propertyName'
                                            onChange={handleChange}
                                            value={propertyDetails.propertyDetails.propertyName}
                                        />
                                        {errors['propertyDetails.propertyName'] && <p className="text-rose-500 text-sm">{errors['propertyDetails.propertyName']}</p>}
                                    </div>


                                    <div className="py-2 md:w-2/3 w-full">
                                    <p className="block text-base p-1 font-medium">
                                        Country <span className="text-red-500">*</span>
                                    </p>
                                    <select
                                       className="border bg-[#C7C7C7]  border-gray-100 w-full p-4 bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0890FF] "
                                        value={propertyDetails.propertyDetails.country}
                                        onChange={handleCountryChange}
                                    >
                                        <option value="" disabled>Select a country</option>
                                        {countryData.map((country) => (
                                        <option key={country.name} value={country.countryCode}>
                                            {country.name}
                                        </option>
                                        ))}
                                    </select>
                                    {errors['propertyDetails.country'] && (
                                        <p className="text-rose-500 text-sm">{errors['propertyDetails.country']}</p>
                                    )}
                                    </div>

                                    <div className="py-2 md:w-2/3 w-full">
                                    <p className="block text-base p-1 font-medium">
                                        Region <span className="text-red-500">*</span>
                                    </p>
                                    <select
                                       className="border bg-[#C7C7C7]  border-gray-100 w-full p-4 bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0890FF] "
                                        value={propertyDetails.propertyDetails.region}
                                        onChange={handleRegionChange}
                                        disabled={!propertyDetails.propertyDetails.country} 
                                    >
                                        <option value="" disabled>Select a Region</option>
                                        {regions.map((region,index) => (
                                        <option key={index} value={region}>
                                            {region}
                                        </option>
                                        ))}
                                    </select>
                                    {/* {errors['propertyDetails.country'] && (
                                        <p className="text-rose-500 text-sm">{errors['propertyDetails.country']}</p>
                                    )} */}
                                    </div>
                                    <div className="py-2 md:w-2/3 w-full">
                                    <p className="block text-base p-1 font-medium">
                                        Rating <span className="text-red-500">*</span>
                                    </p>
                                    <input
                                       className="border bg-[#C7C7C7]  border-gray-100 w-full p-4 bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0890FF] "
                                        value={propertyDetails.propertyDetails.rating}
                                        onChange={handleRatingChange}
                                        placeholder='Add rating like (4.0)'
                                    >
                                         
                                    </input>
                                    {/* {errors['propertyDetails.country'] && (
                                        <p className="text-rose-500 text-sm">{errors['propertyDetails.country']}</p>
                                    )} */}
                                    </div>
                                    <div className=" py-2 grid grid-cols-1 md:grid-cols-12 items-center gap-6">
                                        <div className="md:col-span-8">
                                            <CustomInput isRequired={true} name='propertyDetails.address' onChange={handleChange} value={propertyDetails.propertyDetails.address} label='Address' placeholder='Enter name of your property' labelStyles='!font-normal' inputStyles='!bg-[#FAFAFA] !rounded shadow' />
                                            {errors['propertyDetails.address'] && <p className="text-rose-500 text-sm">{errors['propertyDetails.address']}</p>}
                                        </div>
                                        <div className="md:col-span-4">
                                            <CustomInput isRequired={true} name='propertyDetails.zipCode' onChange={handleChange} value={propertyDetails.propertyDetails.zipCode} label='Zip Code' placeholder='Enter Zip Code' labelStyles='!font-normal' inputStyles='!bg-[#FAFAFA] !rounded shadow' />
                                            {errors['propertyDetails.zipCode'] && <p className="text-rose-500 text-sm">{errors['propertyDetails.zipCode']}</p>}
                                        </div>
                                    </div>

                                    <div className="py-2">
                                        <label className="block text-base  mb-2">Description</label>
                                        <textarea required name='propertyDetails.description' onChange={handleChange} value={propertyDetails.propertyDetails.description} placeholder="Add description of your property (max 1000 words)" className="w-full p-3  bg-[#FAFAFA] !rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500" rows="5"></textarea>
                                        {errors['propertyDetails.description'] && <p className="text-rose-500 text-sm">{errors['propertyDetails.description']}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="p-4 rounded-lg shadow">
                                    <h2 className="text-xl bg-gray-200 px-4 py-3 rounded font-medium ">Room Details</h2>
                                    <div className="p-4">
                                        <div className="grid grid-cols-1gap-4">
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">Bathrooms</h3>
                                                <div className="flex md:flex-row flex-col md:items-center gap-8">
                                                    <div className="flex items-center gap-4">
                                                        <p className="text-base text-gray-600">Bathrooms including en suites <span className="text-red-500">*</span></p>
                                                        <select name='bathrooms.enSuites' value={propertyDetails.roomDetails.bathrooms.enSuites} onChange={handleChange} className="border w-20 border-gray-300 rounded p-1">
                                                            {[...Array(20)].map((_, index) => (
                                                                <option key={index} value={index + 1}>
                                                                    {index + 1}
                                                                </option>
                                                            ))}
                                                            <option value="20+">20+</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex md:justify-normal justify-between items-center  md:gap-4">
                                                        <p className="text-base text-gray-600">Separate WCs</p>
                                                        <select name='bathrooms.separateWcs' value={propertyDetails.roomDetails.bathrooms.separateWcs} onChange={handleChange} className="border w-20 border-gray-300 rounded p-1">
                                                            {[...Array(20)].map((_, index) => (
                                                                <option key={index} value={index + 1}>
                                                                    {index + 1}
                                                                </option>
                                                            ))}
                                                            <option value="20+">20+</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">Bedrooms</h3>
                                                <div className='flex items-center gap-[6.7rem]'>
                                                    <p className="text-sm text-gray-600">Number of bedrooms <span className="text-red-500">*</span></p>
                                                    <select
                                                        className="border w-20 border-gray-300 rounded p-1"
                                                        value={bedrooms}
                                                        onChange={handleBedroomChange}
                                                    >
                                                        {[...Array(20)].map((_, index) => (
                                                            <option key={index} value={index + 1}>
                                                                {index + 1}
                                                            </option>
                                                        ))}
                                                        <option value="20+">20+</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:px-4 overflow-x-auto">
                                        <table className="min-w-full overflow-hidden bg-white border border-gray-100">
                                            <thead>
                                                <tr className="bg-gray-100 border  text-left">
                                                    <th className="py-2 px-4 border-r border-gray-300">Bedroom</th>
                                                    <th className="py-2 px-4  border-r border-gray-300">Number of beds</th>
                                                    <th className="py-2 px-4  border-r border-gray-300">Bed types</th>
                                                    {/* <th className="py-2 px-4  border-r border-gray-300">Ensuite</th> */}
                                                    <th className="py-2 px-4  border-r border-gray-300">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {propertyDetails.roomDetails.bedrooms.map((bedroom, index) => (

                                                    <tr key={index}>
                                                        <td className="py-2 px-4 border-b">{index + 1}</td>
                                                        <td className="py-2 px-4 border-b">
                                                            <select
                                                                name="roomDetails.bedrooms.noOfbeds"
                                                                data-index={index}
                                                                data-field="noOfbeds"
                                                                onChange={handleChange}
                                                                value={bedroom.noOfbeds}
                                                                className="border w-1/2 border-gray-300 rounded p-1">
                                                                {[...Array(20)].map((_, bedIndex) => (
                                                                    <option key={bedIndex} value={bedIndex + 1}>
                                                                        {bedIndex + 1}
                                                                    </option>
                                                                ))}
                                                                <option value="20+">20+</option>
                                                            </select>
                                                        </td>
                                                        <td className="py-2 flex gap-3 items-center px-4 border-b">
                                                            <div className="">Bed {index + 1}</div>
                                                            <select
                                                                name="roomDetails.bedrooms.bedType"
                                                                data-index={index}
                                                                data-field="bedType"
                                                                onChange={handleChange}
                                                                value={bedroom.bedType}
                                                                className="border border-gray-300 rounded px-4 py-1">
                                                                <option value="">Select</option>
                                                                {bedOptions.map((option, optionIndex) => (
                                                                    <option key={optionIndex} value={option.value}>
                                                                        {option.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                    
                                                        <td className="py-2 px-4 border-b text-center">
                                                            <button onClick={() => removeBedroom(index)} className="text-red-500">Remove</button>
                                                        </td>
                                                    </tr>

                                                ))}

                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="grid grid-cols-1 py-6 md:px-5 gap-6">
                                        <div className="flex md:justify-normal justify-between items-center gap-10">
                                            <label className="mb-2 text-gray-700">Double sofa beds</label>

                                            <select name='roomDetails.doubleSofaBeds' value={propertyDetails.roomDetails.doubleSofaBeds} onChange={handleChange} className="border border-gray-300 rounded w-20 py-1">
                                                <option value="">Select</option>
                                                {[...Array(20)].map((_, index) => (
                                                    <option key={index} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                                                <option value="20+">20+</option>
                                            </select>
                                        </div>
                                        <div className="flex md:justify-normal justify-between items-center gap-12">
                                            <label className="mb-2  text-gray-700">Single sofa beds</label>
                                            <select name='roomDetails.singleSofaBeds' value={propertyDetails.roomDetails.singleSofaBeds} onChange={handleChange} className="border border-gray-300 rounded w-20 py-1">
                                                <option value="">Select</option>
                                                {[...Array(20)].map((_, index) => (
                                                    <option key={index} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                                                <option value="20+">20+</option>
                                            </select>
                                        </div>
                                        <div className="flex md:justify-normal justify-between items-center gap-7">
                                            <label className="mb-2  text-gray-700">Single folding beds</label>
                                            <select name='roomDetails.singleFoldingBeds' value={propertyDetails.roomDetails.singleFoldingBeds} onChange={handleChange} className="border border-gray-300 rounded w-20 py-1">
                                                <option value="">Select</option>
                                                {[...Array(20)].map((_, index) => (
                                                    <option key={index} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                                                <option value="20+">20+</option>
                                            </select>
                                        </div>
                                        <div className="flex md:justify-normal justify-between items-center gap-[9rem]">
                                            <label className="mb-2 text-gray-700">Cots</label>
                                            <select name='roomDetails.cots' value={propertyDetails.roomDetails.cots} onChange={handleChange} className="border w-20  border-gray-300 rounded py-1">
                                                <option value="">Select</option>
                                                {[...Array(20)].map((_, index) => (
                                                    <option key={index} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                                                <option value="20+">20+</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="py-6 md:px-5">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Seats</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="flex md:justify-normal justify-between items-center gap-7">
                                                <label className="mb-2 text-gray-700">Dining area seats <span className="text-red-500">*</span></label>
                                                <div className='w-full'>
                                                    <select required name='seats.diningAreaSeats' value={propertyDetails.roomDetails.seats.diningAreaSeats} onChange={handleChange} className="border w-20  border-gray-300 rounded py-1">
                                                        <option value="">Select</option>
                                                        {[...Array(20)].map((_, index) => (
                                                            <option key={index} value={index + 1}>
                                                                {index + 1}
                                                            </option>
                                                        ))}
                                                        <option value="20+">20+</option>
                                                    </select>
                                                    {errors['roomDetails.seats.diningAreaSeats'] && <p className="text-rose-500 text-sm">{'Dining area seats Reuired'}</p>}
                                                </div>
                                            </div>
                                            <div className="flex md:justify-normal justify-between items-center gap-7">
                                                <label className="mb-2  text-gray-700">Living area seats <span className="text-red-500">*</span></label>
                                                <div className='w-full'>
                                                    <select required name='seats.livingAreaSeats' value={propertyDetails.roomDetails.seats.livingAreaSeats} onChange={handleChange} className="border w-20   border-gray-300 rounded py-1">
                                                        <option value="">Select</option>
                                                        {[...Array(20)].map((_, index) => (
                                                            <option key={index} value={index + 1}>
                                                                {index + 1}
                                                            </option>
                                                        ))}
                                                        <option value="20+">20+</option>
                                                    </select>
                                                    {errors['roomDetails.seats.livingAreaSeats'] && <p className="text-rose-500 text-sm">{'Living area seats Reuired'}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg shadow-md ">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl bg-gray-200 px-4 py-3 rounded font-medium w-full">Indoor Facilities</h2>
                                    </div>
                                    <form className="space-y-6">
                                        <div className='md:px-5'>
                                            <h3 className="font-semibold text-gray-700 mb-2">Entertainment</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                {entertainmentOptions.map((option) => (
                                                    <label key={option.name} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name={option.name}
                                                            checked={propertyDetails.indoorFacilities.entertainment[option.name]}
                                                            onChange={(e) => handleCheckboxesChange('entertainment', option.name, e.target.checked)}
                                                            className="mr-2"
                                                        />
                                                        {option.label}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="md:px-5">
                                            <h4 className="font-semibold text-gray-700 mb-2">Select languages TV has channels in:</h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {tvLanguagesOptions.map((option) => (
                                                    <label key={option.name} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name={option.name}
                                                            checked={propertyDetails.indoorFacilities.tvLanguages[option.name]}
                                                            onChange={(e) => handleCheckboxesChange('tvLanguages', option.name, e.target.checked)}
                                                            className="mr-2"
                                                        />
                                                        {option.label}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className='md:px-5'>
                                            <h3 className="font-semibold text-gray-700 mb-2">Heating and air conditioning</h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {heatingAndAirConditioningOptions.map((option) => (
                                                    <label key={option.name} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name={option.name}
                                                            checked={propertyDetails.indoorFacilities.heatingAndAirConditioning[option.name]}
                                                            onChange={(e) => handleCheckboxesChange('heatingAndAirConditioning', option.name, e.target.checked)}
                                                            className="mr-2"
                                                        />
                                                        {option.label}
                                                    </label>
                                                ))}
                                                <select
                                                    className="border border-gray-300 rounded-md p-2"
                                                    value={propertyDetails.indoorFacilities.heatingAndAirConditioning.airConditioningType}
                                                    name='indoorFacilities.heatingAndAirConditioning.airConditioningType'
                                                    onChange={handleChange}
                                                >
                                                    <option value="select">select</option>
                                                    <option value="throughoutProperty">Throughout property</option>
                                                    <option value="bedroomsOnly">Bedrooms only</option>
                                                    <option value="livingRoomsOnly">Living rooms only</option>
                                                </select>


                                            </div>
                                        </div>

                                        <div className='md:px-5'>
                                            <h3 className="font-semibold text-gray-700 mb-4">Leisure</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {leisureOptions.map((option) => (
                                                    <label key={option.name} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name={option.name}
                                                            checked={propertyDetails.indoorFacilities.leisure[option.name]}
                                                            onChange={(e) => handleCheckboxesChange('leisure', option.name, e.target.checked)}
                                                            className="mr-2"
                                                        />
                                                        {option.label}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className='md:px-5'>
                                            <h3 className="font-semibold text-gray-700 mb-4">Household <span className="text-red-500">*</span></h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {householdOptions.map((option) => (
                                                    <label key={option.name} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name={option.name}
                                                            checked={propertyDetails.indoorFacilities.household[option.name]}
                                                            onChange={(e) => handleCheckboxesChange('household', option.name, e.target.checked)}
                                                            className="mr-2"
                                                        />
                                                        {option.label}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="p-4 rounded-lg shadow-md">
                                    <h3 className="text-xl bg-gray-200 px-4 py-3 rounded font-medium mb-4">Outdoor Facilities</h3>
                                    <form className="space-y-6 md:px-5">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                name="privatePool"
                                                checked={propertyDetails.outdoorFacilities.privatePool}
                                                onChange={handleOutoorFacilitiesChange}
                                            />
                                            <label>Private pool</label>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {outdoorFacilitiesOptions.map((option) => (
                                                <label key={option.name} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2"
                                                        name={option.name}
                                                        checked={propertyDetails.outdoorFacilities.facilities[option.name]}
                                                        onChange={handleOutoorFacilitiesChange}
                                                    />
                                                    {option.label}
                                                </label>
                                            ))}
                                        </div>

                                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="flex flex-col">
                                                <label className="font-medium text-gray-600 mb-1">Heating</label>
                                                <select
                                                    name="type"
                                                    className="border border-gray-300 rounded p-2"
                                                    value={propertyDetails.outdoorFacilities.heating.type}
                                                    onChange={handleOutoorFacilitiesChange}
                                                >
                                                    <option value="">None</option>
                                                    <option value="heated">Heated</option>
                                                </select>
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="font-medium text-gray-600 mb-1">Size (m)</label>
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        name="sizeWidth"
                                                        className="border border-gray-300 rounded p-2 w-full"
                                                        placeholder="7"
                                                        value={propertyDetails.outdoorFacilities.heating.size.width}
                                                        onChange={handleOutoorFacilitiesChange}
                                                    />
                                                    <span>x</span>
                                                    <input
                                                        type="text"
                                                        name="sizeHeight"
                                                        className="border border-gray-300 rounded p-2 w-full"
                                                        placeholder="3"
                                                        value={propertyDetails.outdoorFacilities.heating.size.height}
                                                        onChange={handleOutoorFacilitiesChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="font-medium text-gray-600 mb-1">Depth (m)</label>
                                                <div className="flex items-center space-x-2">
                                                    <select
                                                        name="depthMin"
                                                        className="border border-gray-300 rounded p-2 w-full"
                                                        value={propertyDetails.outdoorFacilities.heating.depth.min}
                                                        onChange={handleOutoorFacilitiesChange}
                                                    >
                                                        <option value="">Min</option>
                                                        <option value="0.1">0.1</option>
                                                        <option value="0.2">0.2</option>
                                                        <option value="0.4">0.4</option>
                                                        <option value="0.6">0.6</option>
                                                        <option value="0.8">0.8</option>
                                                        <option value="1.0">1.0</option>
                                                        <option value="1.2">1.2</option>
                                                        <option value="1.4">1.4</option>
                                                        <option value="1.6">1.6</option>
                                                        <option value="1.8">1.8</option>
                                                        <option value="2.0">2.0</option>
                                                    </select>
                                                    <span>-</span>
                                                    <select
                                                        name="depthMax"
                                                        className="border border-gray-300 rounded p-2 w-full"
                                                        value={propertyDetails.outdoorFacilities.heating.depth.max}
                                                        onChange={handleOutoorFacilitiesChange}
                                                    >
                                                        <option value="">Max</option>
                                                        <option value="0.1">0.1</option>
                                                        <option value="0.2">0.2</option>
                                                        <option value="0.4">0.4</option>
                                                        <option value="0.6">0.6</option>
                                                        <option value="0.8">0.8</option>
                                                        <option value="1.0">1.0</option>
                                                        <option value="1.2">1.2</option>
                                                        <option value="1.4">1.4</option>
                                                        <option value="1.6">1.6</option>
                                                        <option value="1.8">1.8</option>
                                                        <option value="2.0">2.0</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className="flex flex-col">
                                            <label className="font-medium text-gray-600 mb-1">Extra information</label>
                                            <textarea
                                                name="extraInformation"
                                                className="border border-gray-300 rounded p-2 w-full"
                                                rows="3"
                                                value={propertyDetails.outdoorFacilities.extraInformation}
                                                onChange={handleOutoorFacilitiesChange}
                                            />
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-700 mb-2">Leisure resort</h4>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    name="partofLeasureResort"
                                                    checked={propertyDetails.outdoorFacilities.partofLeasureResort}
                                                    onChange={handleOutoorFacilitiesChange}
                                                />
                                                Part of leisure resort
                                            </label>
                                        </div>
                                    </form>
                                </div>

                                <div className="p-4 rounded-lg shadow-md">
                                    <h3 className="text-xl bg-gray-200 px-4 py-3 rounded font-medium ">Suitability</h3>
                                    <p className="font-medium py-4 md:px-5">Please tick all boxes your property is suitable for</p>
                                    <form className="grid grid-cols-1 md:px-5 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {
                                            suitabilityOptions.map((option, i) => {
                                                return (
                                                    <label key={i} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name={option.name}
                                                            checked={propertyDetails.suitability[option.name]}
                                                            onChange={HandleSuitabilityChange}
                                                            className="mr-2"
                                                        />
                                                        {option.label}
                                                    </label>

                                                )
                                            })
                                        }


                                    </form>
                                </div>

                            </div>

                            <div className="p-4 rounded-lg shadow-md">
                                <h2 className="text-xl bg-gray-200 px-4 py-3 rounded font-medium ">Checks Details</h2>
                                <div className='py-2 md:px-5 md:w-1/2'>
                                <label className="block text-sm font-semibold">Guests</label>
                                <select
                                value={propertyDetails.checkDetails.guests}
                                onChange={HandleGuestChange}
                                className="w-1/2 mt-2 p-2 border border-gray-300 rounded">
                                    {Array.from({ length: 20 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                    {/* <option value="20+">20+</option> */}
                                </select>
                               </div>
                                <div className='py-2 md:px-5 md:w-1/2'>
                                <label className="block text-sm font-semibold">Unit Id</label>
                                    <input type="number" 
                                    value={propertyDetails.checkDetails.unitId}
                                    onChange={HandleUnitIdChange}
                                    className="border bg-white border-gray-300 w-1/2 p-2  rounded focus:outline-none"
                                    />                              
                               </div>
                                <div className='py-2 md:px-5 md:w-1/2'>
                                <label className="block text-sm font-semibold">Unit Discount</label>
                                    <input type="number" 
                                    value={propertyDetails.checkDetails.unitDiscount}
                                    onChange={HandleUnitDiscountChange}
                                    className="border bg-white border-gray-300 w-1/2 p-2  rounded focus:outline-none"
                                    />                              
                               </div>

                                <div className="py-2 md:px-5 md:w-1/2">
                                    <label className="block text-sm font-semibold">Base Price</label>
                                    <div className="mt-2 flex">
                                        <span className="inline-flex items-center px-3 border border-r border-gray-400 rounded-l text-sm">
                                            {/* Currency dropdown */}
                                            <select className="border-none bg-white text-sm py-2 rounded-l focus:outline-none"
                                                onChange={handleCurrencyChange}
                                                value={propertyDetails.checkDetails.basePrice.currency}
                                            >
                                                <option value="EUR">EUR</option>
                                                <option value="USD">USD</option>
                                                <option value="GBP">GBP</option>
                                                <option value="CHF">CHF</option>
                                                <option value="PLN">PLN</option>
                                                <option value="CAD">CAD</option>
                                            </select>
                                        </span>
                                        <input
                                            type="text"
                                            value={propertyDetails.checkDetails.basePrice.price}
                                            onChange={handleBasePriceChange}
                                            className="block w-1/3 py-2 px-3 border border-l-0 border-gray-400 rounded-r bg-white focus:outline-none sm:text-sm"
                                            placeholder="Enter price"
                                        />
                                    </div>
                                    {errors['checkDetails.basePrice.price'] && <p className="text-rose-500 text-sm">{errors['checkDetails.basePrice.price']}</p>}
                                </div>

                                <div className="p-4">
                                    <p className="mb-4">
                                        Seasonal prices allow you to charge different amounts for specific dates throughout the year.
                                    </p>
                                    <button onClick={handleModalOpen} type='button' className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
                                        Add a seasonal price
                                    </button>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white border border-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-2 border-b">Dates</th>
                                                    <th className="px-4 py-2 border-b">Nightly price</th>
                                                    <th className="px-4 py-2 border-b">Minimum stay</th>
                                                    <th className="px-4 py-2 border-b">Accept multiples of 7 nights only</th>
                                                    <th className="px-4 py-2 border-b"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {propertyDetails.checkDetails.seasonalPricing
                                                    .filter(item =>
                                                        item.dates.from !== '' &&
                                                        item.dates.until !== '' &&
                                                        item.nightlyPrice !== '' &&
                                                        item.minimumStay !== ''
                                                    )
                                                    .map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-4 py-2 border-b">{item.dates.from} - {item.dates.until}</td>
                                                            <td className="px-4 py-2 border-b">{item.nightlyPrice}</td>
                                                            <td className="px-4 py-2 border-b">{item.minimumStay}</td>
                                                            <td className="px-4 py-2 border-b">{item.acceptMultiple ? 'Yes' : 'No'}</td>
                                                            <td className="px-4 py-2 border-b text-blue-600 cursor-pointer" onClick={() => handleModalOpen(index + 1)}>
                                                                Edit
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>

                                        </table>
                                    </div>

                                    {isModalOpen && (
                                        <div className="fixed inset-0 flex px-2 items-center justify-center bg-black bg-opacity-50 z-50">
                                            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h2 className="text-xl font-semibold">{editIndex !== null ? 'Edit Seasonal Price' : 'Add a Seasonal Price'}</h2>
                                                    <button onClick={handleModalClose} className="text-gray-600 hover:text-gray-800">
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                                <form>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700">Dates</label>
                                                        <div className="flex space-x-2">
                                                            <input
                                                                type="date"
                                                                name="from"
                                                                onChange={(e) => handleDateChange(e, 'from')}
                                                                value={seasonalPrice.dates?.from || ''}
                                                                className="w-full p-2 border border-gray-300 rounded"
                                                                placeholder="From"
                                                            />
                                                            <input
                                                                type="date"
                                                                name="until"
                                                                onChange={(e) => handleDateChange(e, 'until')}
                                                                value={seasonalPrice.dates?.until || ''}
                                                                className="w-full p-2 border border-gray-300 rounded"
                                                                placeholder="Until"
                                                            />


                                                        </div>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700">Nightly price</label>
                                                        <input
                                                            type="text"
                                                            name="nightlyPrice"
                                                            value={seasonalPrice.nightlyPrice}
                                                            onChange={handleInputChange}
                                                            className="w-full p-2 border border-gray-300 rounded"
                                                            placeholder="€ 1000"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-semibold">Minimum Stay</label>
                                                        <input
                                                            type="number"
                                                            name="minimumStay"
                                                            value={seasonalPrice.minimumStay}
                                                            onChange={handleInputChange}
                                                            className="block w-full py-2 px-4 border border-gray-300 rounded bg-white focus:outline-none sm:text-sm"
                                                            placeholder="Enter minimum stay in nights"
                                                        />
                                                    </div>

                                                    <div className="mb-4">
                                                        <label className="block text-sm font-semibold">Accept multiples of 7 nights only</label>
                                                        <input
                                                            type="checkbox"
                                                            name="acceptMultiple"
                                                            checked={seasonalPrice.acceptMultiple}
                                                            onChange={handleInputChange}
                                                            className="mt-1"
                                                        />
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button onClick={handleSaveSeasonalPrice} type="submit" className="px-4 py-2 bg-blue-600   text-white rounded">
                                                            {editIndex !== null ? 'Save Changes' : 'Add Price'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end pb-5">
                                <button
                                     onClick={onSubmit}
                                     type='submit'
                                    className="px-7 py-1 bg-primary text-white text-sm  rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Next
                                </button>
                            </div>

                        </div>
                    </form >
                </Section >
            </div >
        </>
    )
}

export default PropertyDetailsForm