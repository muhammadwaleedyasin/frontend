"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";
import Button from "../Button";
import { RxCross2 } from "react-icons/rx";
import { TbMenuDeep } from "react-icons/tb";
import SignInModel from "@/components/website/SignInModel";
import SignUpModel from "@/components/website/SignUpModel";
import UserProfileDropdown from "@/components/website/UserProfileDropdown";
import { useSelector } from "react-redux";
import EmailConfirmationModel from "@/components/website/EmailConfirmationModel";

import help from '/public/assets/help.svg';
import flag from '/public/assets/flag.svg';
import logo from '/public/assets/logo.png';
import { getLocation } from "@/libs/getLocation";
import CountryFlag from 'react-country-flag'

const Navbar = ({data}) => {

    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState("EUR");
    const [isEmail,setIsEmail] = useState(false)
    const pathname = usePathname();
    const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated)
    const isOwnerAuthenticated = useSelector((state) => state.ownerAuth.isOwnerAuthenticated)
    const [countryCode, setCountryCode] = useState('');
    const router = useRouter()

    useEffect(() => {
      const fetchLocation = async () => {
        const locationData = await getLocation();
        if (locationData) {
          setCountryCode(locationData);
        }
      };
      fetchLocation();
    }, []);
   
    console.log("cc",countryCode)

    const searchParams = useSearchParams(); 
    useEffect(() => {
        closeModals();
        if (searchParams.get('login') === 'true') {
            setIsSignInModalOpen(true);
        }
    }, [pathname]);

    const isActive = (path) => {
        return pathname === path ? "!text-primary !font-medium" : "";
    };

    const handleSignInModal = () => {
        setIsSignInModalOpen(true);
        setIsSignUpModalOpen(false);
    };

    const handleSignUpModal = () => {
        setIsSignUpModalOpen(true);
        setIsSignInModalOpen(false);
    };
    const handleEmailModal = () => {
        setIsEmail(true)
        setIsSignUpModalOpen(false);
        console.log("cliing")

    };

    const closeModals = () => {
        setIsSignInModalOpen(false);
        setIsSignUpModalOpen(false);
        setIsEmail(false)
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value);
    };

    const getCurrencyClass = (currency) => {
        return currency === selectedCurrency ? "text-white" : "text-black";
    };


 

    if(pathname==='/admin')
    {
        return(
            <div className="bg-primary w-full">
            <div className="flex justify-center items-center md:max-w-6xl md:px-8 mx-auto w-full py-6">
                <div className="flex justify-between items-center w-full">
                    <div className="flex justify-start">
                        <Link href="/">
                            <p className="md:text-3xl text-xl md:px-0 px-2 flex items-center gap-2 font-medium text-white">
                                <Image src={logo} alt="" className="h-8 w-8" /> rentprivatevillas
                            </p>
                        </Link>
                    </div>
                </div>
            </div>

          
        </div>
        )
    }
   
    // Only show full navbar if not on property-details-form
    if (pathname === "/property-details-form") {
        return (
            <div className="bg-primary w-full">
                <div className="flex justify-center items-center md:max-w-6xl md:px-8 mx-auto w-full py-6">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex justify-start">
                            <Link href="/">
                                <p className="md:text-3xl text-xl md:px-0 px-2 flex items-center gap-2 font-medium text-white">
                                    <Image src={logo} alt="" className="h-8 w-8" /> rentprivatevillas
                                </p>
                            </Link>
                        </div>
                        <div className="flex gap-4">
                            {
                                !isOwnerAuthenticated && (
                                        <>
                                         <Button label='Register' style='!bg-white py-1 px-2 !text-sm !text-primary' onClick={handleSignUpModal} />
                                         <Button label='Sign in' style='!bg-white py-1 px-2 !text-sm !text-primary' onClick={handleSignInModal} />

                                        </>
                                )
                            }
                           
                        </div>
                    </div>
                </div>

                {/* Sign In Modal */}
                <SignInModel isOpen={isSignInModalOpen} onClose={closeModals} switchToSignUp={handleSignUpModal} />
                {/* Sign Up Modal */}
                <SignUpModel isOpen={isSignUpModalOpen} onClose={closeModals} switchToSignIn={handleSignInModal} switchToEMail={handleEmailModal}/>
                <EmailConfirmationModel isOpen={isEmail} onClose={closeModals} />
            </div>
        );
    }

    return (
        <>
            <div className="w-full">
                <div className="flex justify-center bg-primary items-start w-full">
                    <div className="flex flex-col gap-2 md:w-5/6 py-3 flex-shrink-0 w-full">
                        <div className="hidden md:flex gap-7 justify-end items-center">
                            <div className="flex gap-6">
                                <span className="inline-flex items-center bg-transparent rounded-l text-sm">
                                    {/* Currency dropdown */}
                                    <select
                                        className={`border-none text-sm bg-transparent focus:outline-none ${selectedCurrency === "EUR" ? 'text-white' : 'text-black'}`}
                                        value={selectedCurrency}
                                        onChange={handleCurrencyChange}
                                        style={{ color: selectedCurrency ? 'white' : 'black' }}
                                    >
                                        <option value="EUR" className={getCurrencyClass("EUR")}>EUR</option>
                                        {/* <option value="USD" className={getCurrencyClass("USD")}>USD</option>
                                        <option value="GBP" className={getCurrencyClass("GBP")}>GBP</option>
                                        <option value="CHF" className={getCurrencyClass("CHF")}>CHF</option>
                                        <option value="PLN" className={getCurrencyClass("PLN")}>PLN</option>
                                        <option value="CAD" className={getCurrencyClass("CAD")}>CAD</option> */}
                                    </select>
                                </span>
                                <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                                {countryCode && (
                                    <CountryFlag
                                    countryCode={countryCode.country_code2}
                                    svg
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                    aria-label={countryCode.country_code2}
                                    />
                                )}
                                </div>

                                <button onClick={()=>{
                                    router.push('/contactus')
                                }}><Image src={help} alt="help" className="h-6 w-6" /></button>
                            </div>
                            {
                               pathname !== "/list-your-property" && (
                                <Link href='/list-your-property' className="text-white text-xl">List Your Property</Link>

                               )
                            }
                        </div>
                        <div className="flex gap-4 justify-between items-center">
                            <Link href="/">
                                <p className="md:text-3xl text-xl md:px-0 px-2 flex items-center gap-2 font-medium text-white">
                                    <Image src={logo} alt="" className="h-8 w-8" /> rentprivatevillas
                                </p>
                            </Link>
                            <div className="md:hidden flex md:px-0 px-4 items-center">
                                {isMenuOpen ? (
                                    <RxCross2 className="text-white text-xl" onClick={toggleMenu} />
                                ) : (
                                    <TbMenuDeep className="text-white text-xl" onClick={toggleMenu} />
                                )}
                            </div>
                            <div className="hidden md:flex gap-3">
                            {pathname === '/' ? (
                                isAuthenticated ? (
                                    <UserProfileDropdown data={data} />
                                ) : (
                                    <>
                                        <Button 
                                            label='Register' 
                                            style='!bg-white py-1 px-2 !text-sm !text-primary' 
                                            onClick={handleSignUpModal} 
                                        />
                                        <Button 
                                            label='Sign in' 
                                            style='!bg-white py-1 px-2 !text-sm !text-primary' 
                                            onClick={handleSignInModal} 
                                        />
                                    </>
                                )
                            ) : (
                                isOwnerAuthenticated ? (
                                    <UserProfileDropdown data={data} />
                                ) : (
                                    <>
                                        <Button 
                                            label='Register' 
                                            style='!bg-white py-1 px-2 !text-sm !text-primary' 
                                            onClick={handleSignUpModal} 
                                        />
                                        <Button 
                                            label='Sign in' 
                                            style='!bg-white py-1 px-2 !text-sm !text-primary' 
                                            onClick={handleSignInModal} 
                                        />
                                    </>
                                )
                            )}

                            </div>

                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="bg-primary w-full md:hidden flex flex-col gap-4 px-5 py-4">
                        <div className="flex items-center gap-4">
                            <p className="text-white text-xl flex items-center gap-2">EUR <FaChevronDown /></p>
                            <button className="">
                                <Image src={flag} alt="" className="h-7 w-7" />
                            </button>
                        </div>

                        <div className="flex flex-col justify-start items-start gap-3">
                            <button className="text-white text-lg">Contact us</button>
                            <button className="text-white text-lg">List Your Property</button>
                        </div>

                        <div className="flex items-center gap-5">
                        {pathname === '/' ? (
                                isAuthenticated ? (
                                    <UserProfileDropdown data={data} />
                                ) : (
                                    <>
                                        <Button 
                                            label='Register' 
                                            style='!bg-white py-1 px-2 !text-sm !text-primary' 
                                            onClick={handleSignUpModal} 
                                        />
                                        <Button 
                                            label='Sign in' 
                                            style='!bg-white py-1 px-2 !text-sm !text-primary' 
                                            onClick={handleSignInModal} 
                                        />
                                    </>
                                )
                            ) : (
                                isOwnerAuthenticated ? (
                                    <UserProfileDropdown data={data} />
                                ) : (
                                    <>
                                        <Button 
                                            label='Register' 
                                            style='!bg-white py-1 px-2 !text-sm !text-primary' 
                                            onClick={handleSignUpModal} 
                                        />
                                        <Button 
                                            label='Sign in' 
                                            style='!bg-white py-1 px-2 !text-sm !text-primary' 
                                            onClick={handleSignInModal} 
                                        />
                                    </>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Sign In Modal */}
            <SignInModel loginTrue = {searchParams.get("login")==='true'} isOpen={isSignInModalOpen} onClose={closeModals} switchToSignUp={handleSignUpModal} />
            {/* Sign Up Modal */}
            <SignUpModel loginTrue = {searchParams.get("login")==='true'} isOpen={isSignUpModalOpen} onClose={closeModals} switchToSignIn={handleSignInModal} switchToEMail={handleEmailModal} />
            <EmailConfirmationModel isOpen={isEmail} onClose={closeModals} />

        </>
    );
};

export default Navbar;
