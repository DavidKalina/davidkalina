'use client';

import React from 'react';
import MapMojiHero from '@/components/MapMojiHero';
import MapMojiAbout from '@/components/MapMojiAbout';
import MapMojiFeatures from '@/components/MapMojiFeatures';
import MapMojiContact from '@/components/MapMojiContact';

const MapMojiLandingPage = () => {
    return (
        <>
            <MapMojiHero />
            <MapMojiAbout />
            <MapMojiFeatures />
            <MapMojiContact />
        </>
    );
};

export default MapMojiLandingPage;