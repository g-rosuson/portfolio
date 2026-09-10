'use client';

import React, { useCallback, useEffect, useState } from 'react';
import NextImage from 'next/image';

import Projector from './projector/Projector';
import About from 'src/components/pages/home/about/About';
import Spinner from 'src/components/ui/spinner/Spinner';

import { State } from './Home.types';

import styling from './Home.module.scss';

import { IMAGE_ALT, IMAGE_URLS, IMAGE_URLS_MOBILE, PROMISE_TIMEOUT, SESSION_STORAGE_KEY } from './constants';

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
            const isRevisiting = sessionStorage.getItem(SESSION_STORAGE_KEY);

            // If the user is re-visiting don't fetch the images again
            // and render the re-visit view
            if (isRevisiting) {
                setState(prevState => ({ ...prevState, isLoading: false }));
                return;
            }

            sessionStorage.setItem(SESSION_STORAGE_KEY, String(true));

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

    /**
     * Returns the initial "Projector" intro, after the images are fetched.
     * And otherwise the re-visit view.
     */
    const getContent = (images: HTMLImageElement[] | null) => {
        if (images) {
            return (
                <section className={styling.layout} data-show-about-section={showAboutSection}>
                    <div className={styling.projector}>
                        <Projector
                            items={images}
                            onSequenceEnd={aboutSectionHandler}
                        />
                    </div>

                    <section className={styling.about}>
                        <About/>
                    </section>
                </section>
            );
        }

        const imageUrl = isDesktopModeActive ? IMAGE_URLS.at(-1) : IMAGE_URLS_MOBILE.at(-1);

        return (
            <section className={styling.layout} data-show-about-section="true">
                <div className={styling.image}>
                    <NextImage
                        src={imageUrl || ''}
                        alt={IMAGE_ALT}
                        loading="lazy"
                        quality={100}
                        objectFit="cover"
                        fill
                    />
                </div>

                <section className={styling.about}>
                    <About/>
                </section>
            </section>
        );
    };


    // Determine the content view
    const content = (
        <div className={styling.container} data-is-loading={isLoading}>
            {isLoading ? <Spinner/> : getContent(images)}
        </div>
    );

    return content;
};

export default Home;
