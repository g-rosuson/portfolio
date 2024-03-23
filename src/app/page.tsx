import Intro from 'src/components/intro/Intro';

const Home = () => {
    const configuration = {
        mode: 'show-one',
        loop: true,
        startAt: 0,
        elements: [
            {
                content: 'Halló þú', // Can be a JSX component/s
                animation: {
                    mode: 'incremental' as const,
                    type: 'fade-in-lower' as const,
                    easing: 'ease-in-out' as const,
                    duration: 1500,
                    timeout: 1000,
                },
                font: {
                    name: 'Lora',
                    size: 8, // rem
                    weight: 500,
                    style: 'normal',
                    color: '#312E2E',
                },
            },
            {
                content: 'Grüezi',
                animation: {
                    mode: 'sequential' as const,
                    type: 'fade-in-lower' as const,
                    easing: 'ease-in-out' as const,
                    duration: 1500,
                    timeout: 1000,
                },
                font: {
                    name: 'Lora',
                    size: 8, // rem
                    weight: 300,
                    style: 'italic',
                    color: '#eebb58',
                },
            },
            {
                content: 'Ciao',
                animation: {
                    mode: 'incremental' as const,
                    type: 'fade-in-lower' as const,
                    easing: 'ease-in-out' as const,
                    duration: 1500,
                    timeout: 1000,
                },
                font: {
                    name: 'Nunito',
                    size: 8, // rem
                    weight: 300,
                    style: 'normal',
                    color: '#a064c9',
                },
            },
        ],
    };

    return (
        <main>
            <Intro configuration={configuration} />
        </main>
    );
};

export default Home;
