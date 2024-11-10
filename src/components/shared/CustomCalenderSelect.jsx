import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import { SlArrowDown } from 'react-icons/sl';

const CustomCalenderSelect = ({type, options, checkin, checkout, selectedValue, closeDropdown, onChange, defaultLabel, isOpen, onToggle, isDateRange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [dateRange, setDateRange] = useState({
        startDate: type === 'main' ? new Date() : checkin,
        endDate: type === 'main' ? new Date() : checkout,
        key: 'selection',
    });
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false); 

    useEffect(() => {
        if (checkin && checkout) {
            setDateRange({
                startDate: checkin,
                endDate: checkout,
                key: 'selection'
            });
        }
    }, [checkin, checkout]);

    useEffect(() => {
        if (!isDateRange) {
            setFilteredOptions(
                options.filter(option =>
                    option.label.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, options, isDateRange]);

    const handleSelect = (value) => {
        onChange(value);
        setSearchQuery(''); 
        onToggle();         
    };

    const formatDate = (date) => {
        
        return new Intl.DateTimeFormat('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    const handleDateChange = (ranges) => {
        const { startDate, endDate } = ranges.selection;

        if (!isSelectingEndDate) {
            
            setDateRange({ ...dateRange, startDate, endDate: startDate });
            setIsSelectingEndDate(true); 
        } else {
            setDateRange({ ...dateRange, startDate, endDate });
            setIsSelectingEndDate(false); 

            const formattedRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;
            onChange(formattedRange);
            closeDropdown();
        }
    };

    const handleHover = (date) => {
        if (isSelectingEndDate) {
            setDateRange(prevRange => ({
                ...prevRange,
                endDate: date
            }));
        }
    };

    function formatDateRange(dateRange) {
        const [start, end] = dateRange.split(' - ');
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        // Format the output
        const formattedMonth = startDate.toLocaleString('default', { month: 'short' }).toUpperCase();
        const formattedStartDay = startDate.getDate();
        const formattedEndDay = endDate.getDate();
        
        return `${formattedMonth} ${formattedStartDay}-${formattedEndDay} ${startDate.getFullYear()}`;
    }

    return (
        <div className="relative w-full ">
            <div
                className="rounded-md cursor-pointer md:px-10 py-2 min-w-[100%] flex items-center justify-between"
                onClick={onToggle}
            >
                <div className='truncate'>{selectedValue ? formatDateRange(selectedValue) : defaultLabel}</div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SlArrowDown className="text-xl" />
                </div>
            </div>
            {isOpen && (
               <div className="absolute z-10 mt-5 w-full sm:w-auto bg-white border rounded-md shadow-lg overflow-auto" onClick={(e) => e.stopPropagation()}>
                    {!isDateRange ? (
                        <>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full px-3 py-2 border-b"
                            />
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map(option => (
                                    <div
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                    >
                                        {option.label}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-gray-500">No results found</div>
                            )}
                        </>
                    ) : (
                        <div className="p-2 w-full" onClick={(e) => e.stopPropagation()}>
                            <DateRange
                                editableDateInputs={true}
                                onChange={handleDateChange}
                                moveRangeOnFirstSelection={false}
                                ranges={[dateRange]}
                                minDate={new Date()}
                                className="w-full"
                                onRangeFocusChange={(focusedRange) => {
                                    if (focusedRange[0] === 1) {
                                        setIsSelectingEndDate(true);
                                    }
                                }}
                                onShownDateChange={(item) => handleHover(item)}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CustomCalenderSelect;