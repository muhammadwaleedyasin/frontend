import Cards from '@/components/website/home/Cards'
import ChooseUs from '@/components/website/home/ChooseUs'
import HeroSection from '@/components/website/home/HeroSection'
import Payment from '@/components/website/home/Payment'
import Privacy from '@/components/website/home/Privacy'
import React from 'react'
import TopCountries from '@/components/website/home/TopCountries'
import TopRegions from '@/components/website/home/TopRegions'
import Recommended from '@/components/website/home/Recommended'

const LandingPage = () => {
    return (
        <>
            <HeroSection />
            <ChooseUs />
            <Privacy /> 
            <Cards />
            <TopCountries />
            <TopRegions />
            <Recommended />
            <Payment />
        </>
    )
}

export default LandingPage