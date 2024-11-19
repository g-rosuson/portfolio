'use client';

import React, { useCallback, useEffect, useState } from 'react';

import About from './about/About';
import Projector from './projector/Projector';
import Spinner from 'src/components/ui/spinner/Spinner';

import { State } from './Home.types';

import IMG_01 from '../../../../public/images/portraits/01.jpg';
import IMG_02 from '../../../../public/images/portraits/02.jpg';
import IMG_03 from '../../../../public/images/portraits/03.jpg';
import IMG_04 from '../../../../public/images/portraits/04.jpg';
import IMG_05 from '../../../../public/images/portraits/05.jpg';
import IMG_06 from '../../../../public/images/portraits/06.jpg';
import { configuration } from './carouselConfig';

const STATIC_IMAGES = [IMG_01, IMG_02, IMG_03, IMG_04, IMG_05, IMG_06];
const PROMISE_TIMEOUT = 5000;

import styling from './Home.module.scss';

const Home = () => {
    // State
    const [{ images, showFallback, showAbout, isLoading }, setState] = useState<State>({
        images: null,
        showFallback: false,
        showAbout: false,
        isLoading: true
    });


    /**
     * Toggles the "showAbout" state variable.
     */
    const setShowAbout = (isFinished: boolean) => {
        setState(prevState => ({ ...prevState, showAbout: isFinished }));
    };


    /**
     * Sets the statically imported images in the state if they load
     * within the specified timeout.
     */
    const initialiseState = useCallback(async () => {
        try {
            // Create a promise for every statically imported image
            const imagePromises = STATIC_IMAGES.map((data) => {
                return new Promise<HTMLImageElement | null>((resolve) => {
                    const img = new Image();

                    img.src = data.src;
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null);
                });
            });

            // Determine timeout ID
            let timeoutId: NodeJS.Timeout | undefined;

            // Create a timeout promise that resolves in 5 seconds
            const timeoutPromise = new Promise<void>((resolve) => {
                timeoutId = setTimeout(() => resolve(), PROMISE_TIMEOUT);
            });

            // Start a race between the imagePromises and timeoutPromise.
            // If the images load within 5 seconds the "resolvedPromise" will
            // be an array of the imported images, otherwise "null" and the
            // fallback UI will be shown
            const resolvedPromise = await Promise.race([
                Promise.all(imagePromises),
                timeoutPromise
            ]);

            clearTimeout(timeoutId);

            setState(prevState => {
                let showFallback = true;
                let images = null;

                // Determine state update when the images have loaded
                // within the allowed time frame
                if (Array.isArray(resolvedPromise)) {
                    // Remove items that were resolved as "null" (const imagePromises)
                    const filteredImages = resolvedPromise.filter(Boolean) as HTMLImageElement[];

                    // Set the resolved "images" and the "activeImage" in the
                    // state if the imported images were successfully loaded
                    if (filteredImages.length) {
                        showFallback = false;
                        images = filteredImages;
                    }
                }

                return {
                    ...prevState,
                    images,
                    showFallback,
                    isLoading: false
                };
            });

        } catch (error) {
            console.error(error);
        }
    }, []);


    /**
     * Invokes the "initialiseState" function when the component mounts.
     */
    useEffect(() => {
        initialiseState();
    }, [initialiseState]);


    // Determine content
    let content = null;

    if (images) {
        content = (
            <div className={styling.container} data-animate={showAbout}>
                <div className={styling.projector}>
                    <Projector
                        items={images}
                        showAbout={showAbout}
                        onSequenceEnd={setShowAbout}
                    />
                </div>

                <div className={styling.about} hidden={!showAbout}>
                    <About animate={showAbout}/>
                </div>
            </div>
        );
    }

    if (showFallback) {
        // TODO: Add fallback state component
        content = null;
    }


    return isLoading ? <Spinner/> : content;
};

export default Home;