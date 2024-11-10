'use client';
import { LoaderComp } from '@/components/Loader';
import Section from '@/components/shared/Section';
import { backend_url } from '@/libs/data';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const Reservations = () => {
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState([]);

    const GetReservations = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${backend_url}/api/user/getReservationData`);
            setReservations(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetReservations();
    }, []);

    function formatISODateToSimple(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    if (loading) {
        return <LoaderComp />;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <Section>
                <div className="max-w-6xl mx-auto">
                    <h4 className="text-lg font-medium text-primary mb-4">Reservations Data</h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-black">
                            <thead>
                                <tr className="bg-primary border border-black text-white text-sm">
                                    <th className="py-2 px-4 border-r border-black text-left">Reservation Number</th>
                                    <th className="py-2 px-4 border-r border-black text-left">Unit</th>
                                    <th className="py-2 px-4 border-r border-black text-left truncate">Property Name</th>
                                    <th className="py-2 px-4 border-r border-black text-left truncate">Booking</th>
                                    <th className="py-2 px-4 border-r border-black text-left">Status</th>
                                    <th className="py-2 px-4 border-r border-black text-left truncate">Arrival</th>
                                    <th className="py-2 px-4 border-r border-black text-left truncate">Departure</th>
                                    <th className="py-2 px-4 border-r border-black text-left truncate">Guest Name</th>
                                    <th className="py-2 px-4 border-r border-black text-left hidden md:table-cell">Email</th>
                                    <th className="py-2 px-4 border-r border-black text-left hidden md:table-cell">Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations && reservations.map((item, index) => (
                                    <tr key={index} className="border border-black text-xs">
                                        <td className="py-2 border-r border-black px-4 text-center">{item.reserveNumber}</td>
                                        <td className="py-2 border-r border-black px-4">{item.unit}</td>
                                        <td className="py-2 border-r border-black px-4">{item.propertyName}</td>
                                        <td className="py-2 border-r border-black px-4">{formatISODateToSimple(item.bookingDate)}</td>
                                        <td className="py-2 border-r border-black px-4">{item.status}</td>
                                        <td className="py-2 border-r border-black px-4">{formatISODateToSimple(item.checkin)}</td>
                                        <td className="py-2 border-r border-black px-4">{formatISODateToSimple(item.checkout)}</td>
                                        <td className="py-2 border-r border-black px-4 truncate">{item.name}</td>
                                        <td className="py-2 border-r border-black px-4 hidden md:table-cell">{item.email}</td>
                                        <td className="py-2 border-r border-black px-4 hidden md:table-cell">{item.source}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Reservations;
