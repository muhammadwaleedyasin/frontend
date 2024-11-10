'use client';
import { backend_url } from '@/libs/data';
import { fetchOwner } from '@/redux/ownerSlice';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const WithdrawForm = ({ onClose, isOpen,amount,ownerId }) => {
    const dispatch = useDispatch()
  // Validation schema using Yup
  const validationSchema = Yup.object({
    accountHolderName: Yup.string()
      .required('Account Holder Name is required')
      .min(2, 'Must be at least 2 characters'),
    bankName: Yup.string().required('Bank Name is required'),
    accountNumber: Yup.string()
      .required('Account Number is required')
      .matches(/^\d+$/, 'Must be a valid account number'),
    iban: Yup.string()
      .required('IBAN is required')
      .matches(/^[A-Z0-9]+$/, 'Must be a valid IBAN'),
    swiftCode: Yup.string()
      .required('Swift code is required')
      .matches(/^[A-Z0-9]{8,11}$/, 'Must be a valid Swift code'),
    address: Yup.string().required('Address is required'),
    withdrawalAmount: Yup.number()
      .required('Withdrawal amount is required')
      .positive('Must be a positive number'),
  });

  // Initial values for the form fields
  const initialValues = {
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    iban: '',
    swiftCode: '',
    address: '',
    withdrawalAmount: '',
  };

  if (!isOpen) {
    return null;
  }

  // Handle form submission
  const handleSubmit = async(values,{ setSubmitting }) => {
    console.log('Form data', values);
    try{
         await axios.post(`${backend_url}/sendmail`,{
            accountHolderName:values.accountHolderName,
            bankName:values.bankName,
            accountNumber:values.accountNumber,
            iban:values.iban,
            swiftCode:values.swiftCode,
            address:values.address,
            withdrawalAmount:values.withdrawalAmount,
            ownerId:ownerId
        })
        toast.success("You will receive payment in 2 to 3 wokring days")
        dispatch(fetchOwner())
        onClose()
    }
    catch(err)
    {
        console.log(err)
    }
    finally{
        setSubmitting(false)
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Modal overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white min-w-[40%] mx-auto h-[95%] p-6 rounded-md shadow-lg z-10 overflow-auto">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-xl font-bold">Bank Details Form</h2>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
   {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Account Holder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Holder Name
              </label>
              <Field
                name="accountHolderName"
                type="text"
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Account Holder Name"
              />
              <ErrorMessage
                name="accountHolderName"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Bank Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bank Name & Address
              </label>
              <Field
                name="bankName"
                type="text"
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Bank Name"
              />
              <ErrorMessage
                name="bankName"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Number
              </label>
              <Field
                name="accountNumber"
                type="text"
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Account Number"
              />
              <ErrorMessage
                name="accountNumber"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* IBAN */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                IBAN
              </label>
              <Field
                name="iban"
                type="text"
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter IBAN"
              />
              <ErrorMessage
                name="iban"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Swift Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Swift Code
              </label>
              <Field
                name="swiftCode"
                type="text"
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Swift Code"
              />
              <ErrorMessage
                name="swiftCode"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <Field
                name="address"
                type="text"
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Address"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Withdrawal Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Withdrawal Amount
              </label>
              <Field
                name="withdrawalAmount"
                type="number"
                min={50}
                max={amount}
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                placeholder={`Enter Withdrawal Amount between 50-${amount}`}
              />
              <ErrorMessage
                name="withdrawalAmount"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
              >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </Form>
   )}
        </Formik>
      </div>
    </div>
  );
};

export default WithdrawForm;
