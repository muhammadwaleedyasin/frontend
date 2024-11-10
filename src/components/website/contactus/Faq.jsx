'use client'

import Section from '@/components/shared/Section';
import { useState } from 'react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`border-b my-2 px-6 shadow-md rounded-lg border-gray-200 ${isOpen ? 'bg-[#D7D7D7]' : 'bg-[#F1F1F1]'}`}>
            <div
                className="flex justify-between items-center cursor-pointer py-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className={`text-lg font-medium ${isOpen ? 'text-gray-900' : 'text-gray-800'}`}>{question}</h3>
                <span className={`text-xl ${isOpen ? 'text-gray-700' : 'text-gray-500'}`}>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div className="pb-4">
                    <p className="text-gray-600">{answer}</p>
                </div>
            )}
        </div>
    );
};

const FAQ = () => {
    const faqData = [
        { question: 'Who are Rent Private Villas?', answer: 'We are a Cypriot Registered Company who employ multilingual staff, specializing in selling and renting quality villas and apartments around the World.' },
        { question: 'Reservation Office Hours?', answer: 'Our Customer Service Representatives are available from 0900 hrs - 2300 hrs Local Time +2 hours GMT 7 days a week / 365 days a year.' },
        { question: 'What time is Check-in and Check-out, and what is the Check-in Procedure', answer: 'This varies from Villa to Villa across the world, please see Terms and Conditions or call us.' },
        { question: 'How do Guests Find Their Vacation Villa?', answer: 'An email will be sent with directions prior to arrival.' },
        { question: 'Are airport transfers provided?', answer: 'Transfers are not included in the cost of our holidays. However yes can provide this service at an additional cost. Transfers are either by taxi or minibus. Transfers should be booked in advance to avoid disappointment.' },

        // Add more questions and answers here
    ];

    return (
        <div className="">
            <Section>
                <div className="max-w-5xl mx-auto md:pt-[20rem] py-10 space-y-3 relative">
                    <h2 className="text-2xl py-5 font-bold text-primary">RentPrivateVillas FAQ’s Section</h2>
                    {faqData.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default FAQ;
