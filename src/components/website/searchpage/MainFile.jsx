'use client'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import PropertyList from './PropertyList';
import Payment from '../home/Payment';
import { useSearchParams } from 'next/navigation';

const MainFile = () => {
    const [sortOrder, setSortOrder] = useState('lowToHigh');
    const [propertyLength,setPropertyLength] = useState(0)
    const searchParams = useSearchParams()
    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');

    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const when = searchParams.get('when');
    const where = searchParams.get('where');
    const guests = searchParams.get('guests');
    const country = searchParams.get('country');
    const region = searchParams.get('region');
   
    useEffect(() => {
        if (when) {
          const [checkin, checkout] = when.split(' - ');
          setCheckinDate(checkin);
          setCheckoutDate(checkout);
        }
      }, [when]);

 

    return (
        <div>
            <SearchBar propertyLength={propertyLength} onSortChange={handleSortChange} where={where} guests={guests} when={when} country={country} region={region} checkin={checkinDate} checkout={checkoutDate}/>
            <PropertyList setPropertyLength={setPropertyLength} sortOrder={sortOrder} where={where} guests={guests} checkin={checkinDate} checkout={checkoutDate} lat={lat} lon={lon} />
            <Payment />
        </div>
    )
}

export default MainFile