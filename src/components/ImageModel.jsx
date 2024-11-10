import React, { useState } from 'react';

const ImageModal = ({ isOpen, onClose, images }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    if (!isOpen) return null;

    const handleImageClick = (img) => {
        setSelectedImage(img);
    };

    const closeFullscreen = () => {
        setSelectedImage(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[9999]">
            <div className="bg-white rounded-lg w-full h-full max-w-[90vw] max-h-[90vh] overflow-hidden relative p-5">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 border border-[#53C0FF] text-black font-bold py-1 px-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                    Close
                </button>

                <div className="grid grid-cols-2 md:grid-cols-3 mt-10 lg:grid-cols-4 gap-4 p-4 overflow-y-auto h-full">
                    {images.map((img, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img
                                src={img?.large || img} // Use large size as primary
                                alt={img?.title || `Room View ${index + 1}`}
                                className="rounded-lg object-cover h-auto w-full mb-2 cursor-pointer"
                                onClick={() => handleImageClick(img)} // Set the selected image on click
                            />
                        </div>
                    ))}
                </div>

                {/* Fullscreen image view */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[9999]"  onClick={closeFullscreen}>
                        <img
                            src={selectedImage.large || selectedImage} // Use the large size for fullscreen
                            alt={selectedImage.title || 'Fullscreen Image'}
                            className="max-h-full max-w-full object-contain"
                            onClick={closeFullscreen} // Close fullscreen on click
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageModal;
