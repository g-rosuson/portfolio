import React from 'react';

import mappers from './mappers';

import { FormattedBlock } from '../../shared/types';

import styling from './Incremental.module.scss';

const Incremental = ({ block }: { block: FormattedBlock }) => {
    // Creates a progressively longer animation delay for each letter
    let delayFactor = 0;

    // Map the timeout of an element to its index
    const mappedTimeout = mappers.mapToElementTimeoutMap(block);

    // Create element containers that contain the styled words/letters from every element
    return (block.elements ?? []).map((element, index) => {
        // Contains the words in an element
        const groupedWords: React.ReactNode[] = [];

        // Contains the letters and whitespace of a word in an element.
        // This array is reset between words
        let groupedLetters: React.ReactNode[] = [];

        // Creates an animation timeout/pause by adding the timeout of
        // previous elements to the animation delay of the current element
        let timeout = 0;

        for (const [key, value] of Object.entries(mappedTimeout)) {
            if (index > Number(key)) {
                timeout += value;
            }
        }

        // Iterates over an elements content string and applies animation
        // delay, styles and a classname to each character. And groups
        // letters, whitespaces and words together
        for (let index = 0; index < element.content.length; ++index) {
            const char = element.content[index];

            const animationDuration = (element.animation?.duration ?? block.animation.duration);

            const animationDelay = `${(delayFactor * animationDuration) + timeout}ms`;

            // Determine the style object for each character
            const style = {
                ...block.style,
                ...element.style,
                animationDelay
            };

            // Apply styles and font-family with the classname
            const dressedChar = (
                <div key={`${char}_${Math.random()}`} style={style} className={`${block.className}`}>
                    {char}
                </div>
            );

            // Group character into words
            groupedLetters.push(dressedChar);

            // Determine if the current character is a whitespace
            const isWhiteSpace = /\s/.test(char);

            // Determine the index of the last char and account for array indexing
            const lastCharIndex = element.content.length - 1;

            // Determine if the current character is the last one
            const isAtEnd = lastCharIndex === index;

            // If the current character is a whitespace or the last letter, create
            // a new word group and group it with other words and reset the
            // groupedLetters array
            if (isWhiteSpace || isAtEnd) {
                const newGroup = (
                    <div key={index} className={styling.group}>
                        {groupedLetters}
                    </div>
                );

                groupedWords.push(newGroup);

                groupedLetters = [];
            }

            // Only increment the delay factor when the character is not a whitespace
            if (!isWhiteSpace) {
                delayFactor++;
            }
        }


        return (
            <div key={index} className={styling.groups}>
                {groupedWords}
            </div>
        );
    });
};

export default Incremental;
