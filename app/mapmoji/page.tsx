'use client';

import MapMojiAbout from '@/components/MapMojiAbout';
import MapMojiContact from '@/components/MapMojiContact';
import MapMojiFeatures from '@/components/MapMojiFeatures';
import MapMojiHero from '@/components/MapMojiHero';

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