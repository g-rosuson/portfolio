import React from 'react';

import Card from './card/Card';
import Heading from 'src/components/ui/heading/Heading';

import styling from './FeaturedContent.module.scss';

const config = [
    {
        name: 'Fernweh Schweiz',
        theme: 'blue',
        videoUrl: '/videos/fernweh-screencast.webm'
    },
    {
        name: 'Rósa Ólöf',
        theme: 'brown',
        videoUrl: '/videos/fernweh-screencast.webm'
    }
];

const FeaturedContent = () => {
    return (
        <section className={styling.container}>
            <Card
                theme={config[0].theme}
                title={config[0].name}
                videoUrl={config[0].videoUrl}
            />
            <Card
                theme={config[1].theme}
                title={config[1].name}
                videoUrl={config[1].videoUrl}
            />
            <Card
                theme={config[0].theme}
                title={config[0].name}
                videoUrl={config[0].videoUrl}
            />
        </section>
    );
};

export default FeaturedContent;