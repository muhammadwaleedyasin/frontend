'use client'

import React, { useState, useEffect } from 'react';
import PropertyDetailsForm from './PropertyDetailsForm';
import MapImageSection from './MapImageSection';
import Calendar from './Calendar';
import { usePathname } from 'next/navigation';
import { LoaderComp } from '@/components/Loader';
import { useRecoilState } from 'recoil';
import { propertyForm } from '@/recoil/propertyForm';
import axios from 'axios';
import { backend_url } from '@/libs/data';

const MainProperty = () => {
    const [currentSection, setCurrentSection] = useState('form');
    const [propertyId, setPropertyId] = useState(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname(); 
    const [loadingdata,setLoadingData] = useState(false)
    const [propertyData,setPropertyData] = useState(null)
    const [calenderParam, setCalenderParam] = useState(false);

    const [propertyDetails, setPropertyDetails] = useRecoilState(propertyForm);

    useEffect(() => {
        if (pathname) {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            const id = params.get('propertyId');
            const calender = params.get('calender');
            setCalenderParam(calender === 'true');

            if (id) {
                setPropertyId(id);
                console.log("Property ID set:", id);
            } else {
                console.error("Property ID not found in query parameters.");
            }
            setLoading(false);
        }
    }, [pathname]);

    const GetProperty = async(id)=>{
        try{
            setLoadingData(true)
            const res = await axios.get(`${backend_url}/api/owner/getproperty/${id}`)
            setPropertyData(res.data)
        }
        catch(error)
        {
            console.log(error)
        }
        finally{
            setLoadingData(false)
        }
    }

    useEffect(()=>{
        if(propertyId)
        {
            GetProperty(propertyId)
        }

    },[propertyId])

    useEffect(()=>{
        if(propertyData)
        {
          setPropertyDetails(propertyData)
          if (calenderParam) {
            setCurrentSection('calendar');
        }
        }
  
      },[propertyData,calenderParam])

   

    const handleNext = () => {
        console.log(`Moving to next section from ${currentSection}`);
        if (currentSection === 'form') {
            setCurrentSection('map');
        } else if (currentSection === 'map') {
            setCurrentSection('calendar');
        }
    };

    const handlePrevious = () => {
        console.log(`Moving to previous section from ${currentSection}`);
        if (currentSection === 'map') {
            setCurrentSection('form');
        } else if (currentSection === 'calendar') {
            setCurrentSection('map');
        }
    };

    if (loading || loadingdata) {
        return <LoaderComp/>
    }

    return (
        <div>
            {currentSection === 'form' && (
                <PropertyDetailsForm next={handleNext} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails}/>
            )}
            {currentSection === 'map' && (
                <MapImageSection previous={handlePrevious} next={handleNext} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails}/>
            )}
            {currentSection === 'calendar' && (
                <Calendar previous={handlePrevious} propertyFormData={propertyDetails} setPropertyFormData={setPropertyDetails} propertyId={propertyId}/>
            )}
        </div>
    );
};

export default MainProperty;
