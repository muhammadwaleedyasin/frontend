// utils/getLocation.js
export const getLocation = async () => {
  try {
    const response = await fetch('/api/location');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};
