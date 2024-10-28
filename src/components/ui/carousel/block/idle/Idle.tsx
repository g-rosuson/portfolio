import React from 'react';

import { FormattedBlock } from '../../shared/types';

import styling from './Idle.module.scss';

const Idle = ({ block }: { block: FormattedBlock }) => {
    const elements = (block.elements || []).map((element, index) => {
        // Determine the style object for each element
        const style = {
            fontFamily: block.style.fontFamily,
            fontWeight: block.style.fontWeight,
            fontSize: block.style.fontSize,
            color: element.style?.color
        };

        return (
            <span key={index} style={style}>{element.content} </span>
        );
    });


    return (
        <div className={styling.container}>
            {elements}
        </div>
    );
};

export default Idle;