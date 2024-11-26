import React, { useEffect, useState } from 'react';

import { Props } from './Projector.types';

import styling from './Projector.module.scss';

import constants from './constants';

const Projector = ({ items, onSequenceEnd }: Props) => {
    // State
    const [activeImageIndex, setActiveImageIndex] = useState(0);


    /**
     * Creates an interval for each image from the "images" array.
     */
    useEffect(() => {
        // Calculate the index of the next active block using modulo
        const nextActiveImageIndex = (activeImageIndex + 1) % items.length;

        // Create an interval for each image
        const intervalId = setInterval(() => {
            // Invoke the onSequenceEnd callback and clear the
            // interval when all images have been shown
            if (activeImageIndex === items.length - 1) {
                onSequenceEnd();
                clearInterval(intervalId);
                return;
            }

            setActiveImageIndex(nextActiveImageIndex);
        }, constants.INTERVAL_DURATION);

        return () => {
            clearInterval(intervalId);
        };
    }, [activeImageIndex, items, onSequenceEnd]);


    // Determine the active image
    const activeImage = items[activeImageIndex] as HTMLImageElement;


    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            className={styling.image}
            alt="Portrait of Guðmundur, the website creator"
            src={activeImage.src}
        />
    );
};

export default Projector;