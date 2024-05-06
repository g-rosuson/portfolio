import Carousel from 'src/components/carousel/Carousel';

const Home = () => {
    const configuration = {
        mode: 'show-one',
        loop: false,
        startAt: 0,
        blocks: [
            {
                elements: [
                    {
                        content: 'Hi there!',
                        font: {
                            color: '#994de3'
                        }
                    }
                ],
                animation: {
                    mode: 'incremental' as const,
                    type: 'fade-in-lower' as const,
                    easing: 'ease-in-out' as const,
                    duration: {
                        mode: 'per-character' as const,
                        amount: 300
                    },
                    timeout: 1000,
                },
                font: {
                    name: 'bungee',
                    size: '5rem',
                    weight: '300',
                    style: 'italic',
                    color: '#eebb58'
                }
            },
            {
                elements: [
                    {
                        content: 'I\'m Gummi',
                        font: {
                            color: '#eebb58',
                            theme: 'purple'
                        },
                        animation: {
                            timeout: 700
                        }
                    },
                    {
                        content: 'and I do',
                        font: {
                            color: '#cb5f24',
                            theme: 'purple'
                        },
                        animation: {
                            timeout: 400
                        }
                    },
                    {
                        content: 'web',
                        font: {
                            color: '#82c93d'
                        }
                    }
                ],
                animation: {
                    mode: 'incremental' as const,
                    type: 'fade-in-lower' as const,
                    easing: 'ease-in-out' as const,
                    duration: {
                        mode: 'per-character' as const,
                        amount: 300
                    },
                    timeout: 1000
                },
                font: {
                    name: 'bungee',
                    size: '5rem',
                    weight: '300',
                    style: 'italic',
                    color: '#eebb58'
                }
            }
        ]
    };

    return (
        <main>
            <Carousel configuration={configuration} />
        </main>
    );
};

export default Home;
