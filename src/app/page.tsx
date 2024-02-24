import RollerDeck from 'src/components/intro/Intro';

const Home = () => {
    const configuration = {
        mode: 'show-one',
        loop: true,
        startAt: 0,
        elements: [
            {
                content: 'Halló', // Can be a JSX component/s
                animation: {
                    mode: 'incremental' as const,
                    type: 'fadeInAndLower',
                    easing: 'ease-in-out' as const,
                    duration: 2500,
                },
                font: {
                    name: 'Lora',
                    size: 5, // rem
                    weight: 2000,
                    style: 'normal',
                    color: '#312E2E',
                },
            },
            {
                content: 'Grüezi',
                animation: {
                    mode: 'incremental' as const,
                    type: 'fadeInAndLower',
                    easing: 'ease-in-out' as const,
                    duration: 2000,
                },
                font: {
                    name: 'Lora',
                    size: 5, // rem
                    weight: 300,
                    style: 'italic',
                    color: '#eebb58',
                },
            },
            {
                content: 'Ciao',
                animation: {
                    mode: 'incremental' as const,
                    type: 'fadeInAndLower',
                    easing: 'ease-in-out' as const,
                    duration: 3000,
                },
                font: {
                    name: 'Nunito',
                    size: 5, // rem
                    weight: 300,
                    style: 'normal',
                    color: '#a064c9',
                },
            },
        ],
    };

    return (
        <main>
            <RollerDeck configuration={configuration} />
        </main>
    );
};

export default Home;
