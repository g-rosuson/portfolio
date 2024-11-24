'use client';

import React, { useCallback, useEffect, useState } from 'react';
import NextImage from 'next/image';

import Projector from './projector/Projector';
import About from 'src/components/pages/home/about/About';
import Spinner from 'src/components/ui/spinner/Spinner';

import { State } from './Home.types';

import styling from './Home.module.scss';

// The urls to the public folder
const IMAGE_URLS = [
    '/images/portraits/650x867_1.jpg',
    '/images/portraits/650x867_2.jpg',
    '/images/portraits/650x867_3.jpg',
    '/images/portraits/650x867_4.jpg',
    '/images/portraits/650x867_5.jpg',
    '/images/portraits/650x867_6.jpg'
];

const IMAGE_URLS_MOBILE = [
    '/images/portraits/275x367_1.jpg',
    '/images/portraits/275x367_2.jpg',
    '/images/portraits/275x367_3.jpg',
    '/images/portraits/275x367_4.jpg',
    '/images/portraits/275x367_5.jpg',
    '/images/portraits/275x367_6.jpg'
];

// Determine the allowed image loading time
const PROMISE_TIMEOUT = 5000;

const Home = () => {
    // State
    const [state, setState] = useState<State>({
        images: null,
        isDesktopModeActive: false,
        showAboutSection: false,
        isLoading: true
    });

    const {
        images,
        isDesktopModeActive,
        showAboutSection,
        isLoading
    } = state;


    /**
     * It sets the "showAboutSection" state property to true, when the projector
     * has finished.
     *
     * Note: Use "useCallback" to prevent the "useEffect" in the "Projector" to
     * fire when the "showAboutSection" is set to true.
     */
    const aboutSectionHandler = useCallback(() => {
        setState(prevState => ({ ...prevState, showAboutSection: true }));
    }, []);


    /**
     * Returns the initial "Projector" intro, after the images are fetched.
     * And otherwise the re-visit view.
     */
    const getContent = (images: HTMLImageElement[] | null) => {
        if (images) {
            return (
                <div className={showAboutSection ? styling.divide : styling.container}>
                    <div className={styling.projector}>
                        <Projector
                            items={images}
                            onSequenceEnd={aboutSectionHandler}
                        />
                    </div>

                    <div className={styling.about}>
                        <About isVisible={showAboutSection}/>
                    </div>
                </div>
            );
        }

        const imageUrl = isDesktopModeActive ? IMAGE_URLS.at(-1) : IMAGE_URLS_MOBILE.at(-1);

        return (
            <div className={styling.divide}>
                <div className={styling.image}>
                    <NextImage
                        src={imageUrl || ''}
                        alt="Portrait of Guðmundur, the website creator"
                        loading="lazy"
                        quality={100}
                        objectFit="cover"
                        fill
                    />
                </div>

                <div className={styling.about}>
                    <About isVisible/>
                </div>
            </div>
        );
    };


    /**
     * Fetches all intro images on initial session visit and sets them in the state, so they
     * can be displayed without disruption.
     *
     * Sets "images" as null if they are not loaded within in 5 seconds, which triggers the
     * re-visit view.
     *
     * Creates a session ID, used to check if the user has visited the root in the current
     * session.
     */
    const initialiseState = useCallback(async () => {
        try {
            // Determine if the user is re-visiting
            const isRevisiting = sessionStorage.getItem('has_visited');

            // If the user is re-visiting don't fetch the images again
            // and render the re-visit view
            if (isRevisiting) {
                setState(prevState => ({ ...prevState, isLoading: false }));
                return;
            }

            sessionStorage.setItem('has_visited', String(true));

            // If the window width is larger than 500px, use the bigger version of the images
            const isDesktopModeActive = window.screen.width > 500;

            // Determine import urls
            const urls = isDesktopModeActive ? IMAGE_URLS : IMAGE_URLS_MOBILE;

            // Create an array of imported image promises
            const imagePromises = urls.map((src) => {
                return new Promise<HTMLImageElement | null>(resolve => {
                    const img = new Image();

                    img.src = src;
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
            // be an array of the imported images, otherwise "undefined" and the
            // fallback UI will be shown
            const resolvedPromise = await Promise.race([
                Promise.all(imagePromises),
                timeoutPromise
            ]);

            clearTimeout(timeoutId);

            setState(prevState => {
                let images = null;

                // Determine state update when the images have loaded
                // within the allowed time frame
                if (Array.isArray(resolvedPromise)) {
                    // Remove items that were resolved as "null" (const imagePromises)
                    const filteredImages = resolvedPromise.filter(Boolean) as HTMLImageElement[];

                    // Set the resolved "images" and the "activeImage" in the
                    // state if the imported images were successfully loaded
                    if (filteredImages.length) {
                        images = filteredImages;
                    }
                }

                return {
                    ...prevState,
                    images,
                    isDesktopModeActive,
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


    return isLoading ? <Spinner/> : getContent(images);
};

export default Home;
