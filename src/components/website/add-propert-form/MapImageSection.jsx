'use client'
import Section from '@/components/shared/Section';
import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase";
import toast from 'react-hot-toast';
import { MdFileUpload } from "react-icons/md";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { What3WordsV3 } from '@what3words/api';

const MapImageSection = ({ previous, next, propertyDetails, setPropertyDetails }) => {
    const [images, setImages] = useState(propertyDetails.placeImages);
    const [fileObjects, setFileObjects] = useState([]);
    const [errors, setErrors] = useState('')
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBLEV6glXZvKU8R5lyx7v7OV7HD4kjPZeo",
        libraries: ["places"],
    });

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setImages((prevImages) => [
            ...prevImages,
            ...files.map((file) => URL.createObjectURL(file)),
        ]);
        setFileObjects((prevFiles) => [...prevFiles, ...files]);
    };

    const handleRemoveImage = (image) => {
        setImages((prevImages) => prevImages.filter((img) => img !== image));
        const indexToRemove = images.indexOf(image);
        setFileObjects((prevFiles) =>
            prevFiles.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleUpload = async () => {
        if (!fileObjects.length) return;
        const loadingToastId = toast.loading('Uploading...');
        const uploadedUrls = [];

        for (const file of fileObjects) {
            const fileName = file.name;
            const storageRef = ref(storage, `/propertyImages/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            try {
                await uploadTask;
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                uploadedUrls.push(url);
            } catch (error) {
                console.error("Error handling upload:", error);
                toast.error('Some Images failed to upload');
                toast.dismiss(loadingToastId);
                return;
            }
        }

        if (uploadedUrls.length) {
            setPropertyDetails((prevDetails) => ({
                ...prevDetails,
                placeImages: uploadedUrls,
            }));
            toast.success('Images uploaded successfully');
        }

        toast.dismiss(loadingToastId);
    };

    const onMapClick = useCallback(
        (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setPropertyDetails((prevDetails) => ({
                ...prevDetails,
                propertyPosition: {
                    lat: lat,
                    lng: lng,
                },
            }));
            
        },
        [setPropertyDetails]
    );
    

    const onMarkerDragEnd = useCallback((event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            propertyPosition: {
                lat: lat,
                lng: lng,
            },
        }));
    }, [setPropertyDetails]);
    const handleLatChange = (e) => {
        const lat = parseFloat(e.target.value);
        if(propertyDetails.propertyPosition.lat)
        {
            setPropertyDetails((prevDetails) => ({
                ...prevDetails,
                propertyPosition: {
                    ...prevDetails.propertyPosition,
                    lat: isNaN(lat) ? '' : lat,
                },
            }));
        }
        else{
            setPropertyDetails((prevDetails) => ({
                ...prevDetails,
                propertyPosition: {
                    ...prevDetails.propertyPosition,
                    lat: isNaN(lat) ? '' : lat,
                },
            }));
        }
       
    };

    console.log("p",propertyDetails)

    const handleLngChange = (e) => {
        const lng = parseFloat(e.target.value);
        if(propertyDetails.propertyPosition.lng)
        {
            setPropertyDetails((prevDetails) => ({
                ...prevDetails,
                propertyPosition: {   
                    ...prevDetails.propertyPosition,
                    lng: isNaN(lng) ? '' : lng,
                },
            }));

        }
        else{
            setPropertyDetails((prevDetails) => ({
                ...prevDetails,
                propertyPosition: {
                    ...prevDetails.propertyPosition,
                    lng: isNaN(lng) ? '' : lng,
                },
            }));
        }
        
    };

    // console.log("Prr",propertyDetails.propertyRegion)

    const onSubmit = (e) => {
        e.preventDefault();
        if (images.length < 5) {
            setErrors('Please upload at least 5 image.');
            return;
        }
        setErrors('');
        console.log(propertyDetails);
        next();
    };

    return (
        <div>
            <Section>
                <div className="max-w-5xl space-y-4 mx-auto">
                    <div className=''>
                        <div className="space-y-5">
                            <h3 className="text-xl px-4 my-3 bg-gray-200 py-4 font-medium">Pin the Location of your property</h3>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Latitude</label>
                                    <input
                                        type="number"
                                        value={propertyDetails.propertyRegion.lat ? propertyDetails.propertyRegion.lat : propertyDetails.propertyPosition.lat}
                                        onChange={handleLatChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                        placeholder="Enter latitude"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Longitude</label>
                                    <input
                                        type="number"
                                        value={propertyDetails.propertyRegion.lng ? propertyDetails.propertyRegion.lng : propertyDetails.propertyPosition.lng}
                                        onChange={handleLngChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                        placeholder="Enter longitude"
                                    />
                                </div>
                            </div>
                            <div className="border p-4">
                                {isLoaded && (
                                    <GoogleMap
                                        mapContainerStyle={{ height: "400px", width: "100%" }}
                                        center={propertyDetails.propertyRegion.lat && propertyDetails.propertyRegion.lng ? propertyDetails.propertyRegion : propertyDetails.propertyPosition   }
                                        zoom={13}
                                        onClick={onMapClick}
                                    >
                                        <Marker
                                            position={propertyDetails.propertyRegion.lat && propertyDetails.propertyRegion.lng ? propertyDetails.propertyRegion : propertyDetails.propertyPosition}
                                            draggable={true}
                                            onDragEnd={onMarkerDragEnd}
                                        />
                                    </GoogleMap>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl px-4 my-3 bg-gray-200 py-4 font-medium mb-2">What does your place look like?</h3>
                            <div className="border p-4">
                                <p className="text-sm mb-2">Upload at least 5 photos of your property.</p>
                                <div className="border-dashed border-2 border-gray-400 p-4 text-center">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/jpeg, image/png"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="text-blue-500 cursor-pointer">
                                        Drag and drop or <span className="text-blue-500">Upload photos</span>
                                    </label>
                                    <p className="text-sm text-gray-500">jpg/jpeg or png, maximum 47MB each</p>
                                </div>
                                {errors && <p className="text-red-500 text-center">{errors}</p>}
                            </div>
                        </div>

                        <div className='w-full flex flex-col items-center gap-8'>
                            <div className="py-4 grid grid-cols-1 w-full md:grid-cols-4 items-center gap-6">
                                {images.map((image, index) => (
                                    <div key={index} className="bg-white relative justify-center shadow flex flex-col items-center p-3 rounded">
                                        <Image src={image} alt={`uploaded image ${index}`} className='h-40' width={160} height={160} />
                                        <RxCrossCircled
                                            className='absolute top-2 right-3 cursor-pointer'
                                            onClick={() => handleRemoveImage(image)}
                                        />
                                    </div>
                                ))}
                            </div>
                            {images.length > 0 && (
                                <button onClick={handleUpload} className='flex items-center bg-green-700 gap-2 text-white py-2.5 px-8 rounded-lg shadow-xl hover:scale-110 font-medium'>
                                    Upload Images <MdFileUpload className='text-2xl' />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end py-6 gap-7">
                        <button
                            onClick={previous}
                            type="button"
                            className="px-5 py-1 text-primary border-2 border-primary text-sm rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Back
                        </button>
                        <button
                            onClick={onSubmit}
                            type="button"
                            className="px-6 py-1 bg-primary text-white text-sm rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default MapImageSection;
