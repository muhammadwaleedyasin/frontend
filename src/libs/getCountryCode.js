// /utils/getCountryCode.js
export const getCountryCode = async () => {
    const response = await fetch('https://ipinfo.io/json?token=121e7c0d03d3ab'); 
    const data = await response.json();
    return data.country; // returns country code like 'US', 'IN', etc.
  };
  