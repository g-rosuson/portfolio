import React from 'react';

import { IFormattedElement } from '../../types';

import styling from './Incremental.module.css';

const Incremental = ({ element }: { element: IFormattedElement }) => {
    // The delay factor is incremented by one when an item is not
    // a white space. Which subsequently creates a progressively
    // longer delay for each visible character
    let delayFactor = 0;

    // Grouped words, where every word group is made
    // of styled JSX characters
    const characterGroups = [];

    // Contains the styled JSX characters within a word
    let characterGroup = [];

    // Groups and creates styled JSX characters according
    // to word structure of the given string
    for (let index = 0; index < element.content.length; index++) {
        const char = element.content[index];

        // Determine the style object for each character
        const style = {
            ...element.style,
            animationDelay: `${delayFactor * element.animation.intervalDuration}ms`,
        };

        // Apply styles and font-family with the classname
        const dressedChar = (
            <span key={`${char}_${Math.random()}`} style={style} className={element.className}>
                {char}
            </span>
        );

        characterGroup.push(dressedChar);

        // If the character is a whitespace or this is the last iteration.
        // Create a word group of JSX characters
        const isWhiteSpace = /\s/.test(char);
        const isAtEnd = element.content.length - 1 === index;

        if (isWhiteSpace || isAtEnd) {
            const newGroup = (
                <div key={index} className={styling.group}>
                    {characterGroup}
                </div>
            );

            characterGroups.push(newGroup);
            characterGroup = [];

            continue;
        }

        // Only increment the delay factor when
        // the character is not a white space
        delayFactor++;
    }

    return (
        <div className={styling.container}>
            <div className={styling.groups}>{characterGroups}</div>
        </div>
    );
};

export default Incremental;
