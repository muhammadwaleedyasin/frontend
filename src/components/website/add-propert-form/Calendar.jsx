'use client';

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { backend_url } from '@/libs/data';
import { useSelector } from 'react-redux';

const CalendarComponent = ({ previous, propertyFormData, setPropertyFormData, propertyId }) => {
    const [unavailableDates, setUnavailableDates] = useState(propertyFormData?.unavailableDates || []); // List of unavailable dates
    const router = useRouter();

    const owner = useSelector((state) => state.owner.owner);
    // Handle single date selection
    const handleDateClick = (clickInfo) => {
        const selectedDate = clickInfo.date;

        // Check if the selected date is already marked as unavailable
        const isAlreadyUnavailable = unavailableDates.some(
            (date) => date.toDateString() === selectedDate.toDateString()
        );

        if (!isAlreadyUnavailable) {
            // Mark date as unavailable
            setUnavailableDates((prev) => [...prev, selectedDate]);
            setPropertyFormData((prevFormData) => ({
                ...prevFormData,
                unavailableDates: [...(prevFormData.unavailableDates || []), selectedDate],
            }));
            toast.success('Date marked as unavailable');
        } else {
            toast.error('This date is already marked as unavailable');
        }
    };

    // Remove an unavailable date
    const removeUnavailableDate = (index) => {
        const updatedDates = [...unavailableDates];
        updatedDates.splice(index, 1);
        setUnavailableDates(updatedDates);
        setPropertyFormData((prevFormData) => ({
            ...prevFormData,
            unavailableDates: updatedDates,
        }));
    };

    // Submit property form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(propertyFormData);

        try {
            const url = propertyId
                ? `${backend_url}/api/owner/updateproperty/${propertyId}`
                : `${backend_url}/api/owner/addproperty`;
            const method = propertyId ? 'put' : 'post';

            await axios[method](url, {
                ownerId: owner._id,
                ...propertyFormData,
            });

            toast.success(propertyId ? 'Property Updated' : 'Property Added');
            router.push('/dashboard');
            setPropertyFormData(null)
        } catch (error) {
            console.log(error);
            toast.error('Error occurred while saving property data');
        }
    };

    return (
        <div className="flex flex-col md:flex-row md:space-x-8 p-4">
            {/* Unavailable Dates List */}
            <div className="w-full md:w-1/4 p-4 border rounded-md bg-white shadow-md mb-4 md:mb-0">
                <h3 className="text-lg font-semibold mb-4">Unavailable Dates</h3>
                <ul className="space-y-2">
                    {unavailableDates.length > 0 ? (
                        unavailableDates.map((date, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{date.toDateString()}</span>
                                <button
                                    onClick={() => removeUnavailableDate(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No unavailable dates set</p>
                    )}
                </ul>
            </div>

            {/* Calendar */}
            <div className="w-full md:w-3/4 max-w-5xl space-y-4">
                <h3 className="text-xl px-4 my-3 bg-gray-200 py-4 font-medium mb-2">Select Dates</h3>
                <div className="bg-white border rounded-md shadow-md">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        dateClick={handleDateClick}
                        events={unavailableDates.map((date) => ({
                            start: date,
                            end: date,
                            title: 'Unavailable',
                            color: 'red',
                        }))}
                    />
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end py-6 gap-4">
                    <button
                        onClick={previous}
                        type="button"
                        className="px-5 py-2 text-primary border-2 border-primary text-sm rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-primary text-white text-sm rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;
