import React, { useState, useEffect } from 'react';
import { SlArrowDown } from 'react-icons/sl';
import useCountries from '@/hooks/useCountries'; // Ensure the hook is imported

const CustomInputSelect = ({ selectedValue, onChange,closeDropdown, defaultLabel, isOpen, onToggle, selectedRegion, setSelectedRegion }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const { getAll } = useCountries();

    const options = getAll();

    useEffect(() => {
        if (searchQuery) {
            // Filter countries based on the search query
            const filteredCountries = options.filter(option =>
                option.label.toLowerCase().includes(searchQuery.toLowerCase())
            );

            // For each filtered country, include its regions
            const countryAndRegionsOptions = filteredCountries.flatMap(country => [
                {
                    countryValue: country.value,
                    region: '', // No region, just the country
                    displayLabel: country.label, // Display the country name
                },
                ...country.regions.map(region => ({
                    countryValue: country.value,
                    region, // Specific region
                    displayLabel: `${country.label}, ${region}`, // Display country and region
                })),
            ]);

            // Additionally, filter regions based on the search query and show matching regions
            const regionOptions = options.flatMap(country =>
                country.regions
                    .filter(region => region.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(region => ({
                        countryValue: country.value,
                        region,
                        displayLabel: `${country.label}, ${region}`, // Display both country and matching region
                    }))
            );

            // Merge both country+region and region-only matches, removing duplicates
            const mergedOptions = [
                ...countryAndRegionsOptions, // Include countries and their regions
                ...regionOptions, // Include regions matching the search query
            ];

            // Remove duplicate options (if the same country-region pair appears twice)
            const uniqueOptions = mergedOptions.filter(
                (option, index, self) =>
                    index === self.findIndex((t) => t.displayLabel === option.displayLabel)
            );

            setFilteredOptions(uniqueOptions);
        } else {
            // Reset the filtered options when searchQuery is empty
            setFilteredOptions([]);
        }
    }, [searchQuery, options]);

    const handleSelect = (countryValue, region) => {
        onChange(countryValue); // Pass only the country value to onChange
        setSelectedRegion(region); // Set the selected region for display
        closeDropdown()
        setSearchQuery(''); // Clear the search query
    };

    const getSelectedLabel = () => {
        const selectedCountry = options.find(option => option.value === selectedValue);
        if (selectedCountry) {
            return selectedRegion
                ? `${selectedCountry.label}, ${selectedRegion}` // Show country and region
                : selectedCountry.label; // Only show country if no region is selected
        }
        return defaultLabel;
    };

    return (
        <div className="relative w-full">
            <div
                className="cursor-pointer md:px-10 py-2 w-[100%] flex items-center justify-between"
                onClick={onToggle}
            >
                <div className='truncate'>{getSelectedLabel()} </div>{/* Display selected country and region */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SlArrowDown className="text-xl" />
                </div>
            </div>
            {isOpen && (
                <div className="absolute bg-white z-10 mt-5 w-full rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {/* Search Input */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search country or region..."
                        className="w-full px-3 py-2 border-b outline-none bg-[#6c69692f] text-black"
                    />
                    
                    {/* Dropdown Options */}
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(option => (
                            <div
                                key={`${option.countryValue}-${option.region}`}
                                onClick={() => handleSelect(option.countryValue, option.region)}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-black text-left"
                            >
                                {option.displayLabel}
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-gray-500">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomInputSelect;
