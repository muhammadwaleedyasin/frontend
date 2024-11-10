import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Pagination = ({ pageCount, currentPage = 1, onPageChange }) => {
    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const getPageRange = () => {
        const delta = 2; // Number of pages shown around the current page
        let range = [];
        const rangeWithDots = [];
        const left = currentPage - delta;
        const right = currentPage + delta + 1;

        for (let i = 1; i <= pageCount; i++) {
            if (i === 1 || i === pageCount || (i >= left && i < right)) {
                range.push(i);
            }
        }

        let l;

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    return (
        <ol className="flex justify-center gap-1 pt-5 text-xs font-medium">
            <li>
                <button
                    className="flex w-8 h-8 rounded-md items-center justify-center border border-[#F1F1F1] bg-white rtl:rotate-180"
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <span className="sr-only">Prev Page</span>
                    <MdKeyboardArrowLeft className="text-xl" />
                </button>
            </li>

            {getPageRange().map((page, index) => (
                <li key={index}>
                    {page === "..." ? (
                        <div className="flex items-end h-full">
                            <span className="px-2">...</span>
                        </div>
                    ) : (
                        <a
                            href="#"
                            className={`block w-8 h-8 rounded-md border ${currentPage === page
                                    ? "border-0 bg-primary text-white"
                                    : "border-[#F1F1F1] bg-white text-black"
                                } text-center leading-8`}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(Number(page));
                            }}
                        >
                            {page}
                        </a>
                    )}
                </li>
            ))}

            <li>
                <button
                    className="flex w-8 h-8 rounded-md items-center justify-center border border-[#F1F1F1] bg-white rtl:rotate-180"
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === pageCount}
                >
                    <span className="sr-only">Next Page</span>
                    <MdKeyboardArrowRight className="text-xl" />
                </button>
            </li>
        </ol>
    );
};

export default Pagination;
