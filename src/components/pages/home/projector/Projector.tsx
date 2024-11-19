import React, { useEffect, useState } from 'react';
import NextImage from 'next/image';

import { Props } from './Projector.types';

const INTERVAL_DURATION = 400;

import styling from './Projector.module.scss';

const Projector = ({ items, onSequenceEnd, showAbout }: Props) => {
    // State
    const [activeImageIndex, setActiveImageIndex] = useState(0);


    /**
     * Creates an interval for each image from the "images" array.
     */
    useEffect(() => {
        // Only run the "Projector" when the "About" component is inactive
        if (!showAbout) {
            // Calculate the index of the next active block using modulo
            const nextActiveImageIndex = (activeImageIndex + 1) % items.length;

            // Create an interval for each image
            const intervalId = setInterval(() => {
                // Invoke the onSequenceEnd callback and clear the
                // interval when all images have been shown
                if (activeImageIndex === items.length - 1) {
                    onSequenceEnd(true);
                    clearInterval(intervalId);
                    return;
                }

                setActiveImageIndex(nextActiveImageIndex);
            }, INTERVAL_DURATION);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [activeImageIndex, items, onSequenceEnd]);


    // Determine the active image
    const activeImage = items[activeImageIndex] as HTMLImageElement;


    return (
        <div className={styling.image}>
            <NextImage
                alt="Headshot of Guðmundur, the creator of rosuson.com"
                src={activeImage.src}
                fill
            />
        </div>
    );
};

export default Projector;