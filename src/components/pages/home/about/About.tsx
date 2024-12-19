import React, { useEffect, useRef, useState } from 'react';

import Heading from 'src/components/ui/heading/Heading';
import { CheckmarkSquared, Copy, External } from 'src/components/ui/icons/Icons';

import { Props } from './About.types';

const EMAIL_ADDRESS = 'g.rosuson@gmail.com';
const HEADING = 'Hi there';
const INTRO_MESSAGE = 'My name is Guðmundur and I\'m a web developer based in Baden, Switzerland';

import styling from './About.module.scss';

const About = ({ isVisible }: Props) => {
    // State
    const [copied, setCopied] = useState(false);


    // Ref
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);


    /**
     * Adds the email to the clipboard and sets & resets the "copied"
     * state property with a delay.
     */
    const copyEmailHandler = async () => {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
        setCopied(true);

        // Clear any existing timeout before setting a new one
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout and store its ID in the "timeoutRef"
        timeoutRef.current = setTimeout(() => {
            setCopied(false);
        }, 2000);
    };


    /**
     * Clears up an active timeout when the component unmounts.
     */
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);


    return (
        <div className={styling.container} data-is-visible={isVisible}>
            <div>
                <div className={styling.heading}>
                    <Heading level={2} removeMargin>
                        {HEADING}
                    </Heading>
                </div>

                <p className={styling.paragraph}>
                    {INTRO_MESSAGE}
                </p>
            </div>

            <div className={styling.wrapper}>
                <p className={styling.contact}>
                    Contact
                </p>

                <a
                    className={styling.field}
                    href="https://www.linkedin.com/in/guðmundur-helgi-rósuson-63bb6a191/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className={styling.label}>
                        LinkedIn
                    </span>

                    <div className={styling.icon}>
                        <External/>
                    </div>
                </a>

                <button
                    className={styling.field}
                    onClick={copyEmailHandler}
                    aria-label="Copy email address g.rosuson@gmail.com to clipboard"
                >
                    <span className={styling.label}>
                        {EMAIL_ADDRESS}
                    </span>

                    <div className={copied ? styling.hidden : styling.icon}>
                        <Copy/>
                    </div>

                    <div className={copied ? styling.checkmark : styling.hidden}>
                        <CheckmarkSquared/>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default About;