'use client';

import React, { useEffect, useState } from 'react';

import Carousel from './carousel/Carousel';
import FeaturedContent from 'src/components/intro/featuredContent/FeaturedContent';

import helpers from './helpers';

import { IConfiguration } from 'src/components/intro/types';

import configuration from './configuration';

const Intro = () => {
    // State
    const [activeComponent, setActiveComponent] = useState('carousel');


    // Map "activeComponent" state values to their corresponding components
    const components: { [key: string]: React.ComponentType<{ configuration: IConfiguration }> } = {
        featuredContent: FeaturedContent,
        carousel: Carousel
    };


    /**
     * Creates a timeout that sets the name of the next active component in
     * the state after the total duration of the carousel has passed.
     */
    useEffect(() => {
        const timeoutDuration = helpers.getTotalDuration(configuration);

        const timeout = setTimeout(() => {
            setActiveComponent('featuredContent');
        }, timeoutDuration);

        return () => {
            clearTimeout(timeout);
        };
    }, []);


    // Determine active component
    const Component = components[activeComponent] ?? (() => null);


    return <Component configuration={configuration}/>;
};

export default Intro;