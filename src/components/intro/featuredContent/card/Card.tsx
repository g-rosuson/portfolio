import React, { MouseEventHandler } from 'react';

import Heading from 'src/components/ui/heading/Heading';
import PopupMenu from 'src/components/ui/popupMenu/PopupMenu';

import styling from './Card.module.scss';

type Props = {
    title: string,
    theme: 'blue' | 'brown',
    videoUrl: string
}

const Card = ({ title, theme, videoUrl }: Props) => {
    /**
     * Plays and pauses the card video.
     */
    const videoHandler: MouseEventHandler<HTMLVideoElement> = async (event) => {
        const target = event.target as HTMLVideoElement;

        if (event.type === 'mouseover') {
            await target.play();

        } else {
            target.pause();
        }
    };


    // Map card classes to the provided card theme
    const cardClasses: { [key: string]: string } = {
        brown: styling.brown,
        blue: styling.blue
    };

    // Determine the card class based on the provided theme
    const cardClass = cardClasses[theme];


    return (
        <div className={cardClass} tabIndex={1}>
            <div className={styling.mask}/>

            <div className={styling.heading}>
                <Heading size="xl" level={2} color={theme}>
                    {title}
                </Heading>
            </div>

            <div className={styling.menu}>
                <PopupMenu/>
            </div>

            <video
                className={styling.video}
                onMouseOver={videoHandler}
                onMouseOut={videoHandler}
                playsInline
                muted
                loop
            >
                <source src={videoUrl} type="video/webm"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Card;