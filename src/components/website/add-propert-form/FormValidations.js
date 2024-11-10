import { useState } from 'react';

const useFormValidator = (initialValues, requiredFields) => {
    const [errors, setErrors] = useState({});

    const validateForm = (values) => {
        const tempErrors = {};
        let isValid = true;

        requiredFields.forEach((field) => {
            const value = field.split('.').reduce((acc, part) => acc && acc[part], values);

            if (!value || !value.trim()) {
                tempErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required.`;
                isValid = false;
            }
        });

        // Additional validation for basePrice
        if (values.checkDetails?.basePrice?.price) {
            if (isNaN(values.checkDetails.basePrice.price) || values.checkDetails.basePrice.price <= 0) {
                tempErrors['checkDetails.basePrice.price'] = 'Base price must be a positive number.';
                isValid = false;
            }
        } else {
            tempErrors['checkDetails.basePrice.price'] = 'Base price is required.';
            isValid = false;
        }

        // Check if all times are selected
        const checkIn = values.checkDetails?.checkIn || {};
        const checkOut = values.checkDetails?.checkOut || {};

        if (!checkIn.from) {
            tempErrors['checkDetails.checkIn.from'] = 'Check-in from time is required.';
            isValid = false;
        }
        if (!checkIn.until) {
            tempErrors['checkDetails.checkIn.until'] = 'Check-in until time is required.';
            isValid = false;
        }
        if (!checkOut.from) {
            tempErrors['checkDetails.checkOut.from'] = 'Check-out from time is required.';
            isValid = false;
        }
        if (!checkOut.until) {
            tempErrors['checkDetails.checkOut.until'] = 'Check-out until time is required.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    return { errors, validateForm };
};

export default useFormValidator;
