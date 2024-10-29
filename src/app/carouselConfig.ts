export const configuration = {
    mode: 'show-one',
    loop: false,
    startAt: 0,
    replayOnRevisit: false,
    id: 'intro-carousel',
    blocks: [
        {
            elements: [
                {
                    content: 'Hi there!',
                    font: {
                        color: '#dfe70d'
                    }
                }
            ],
            animation: {
                mode: 'incremental' as const,
                type: 'fade-in-lower' as const,
                easing: 'ease-in-out' as const,
                duration: {
                    mode: 'per-character' as const,
                    amount: 200
                },
                timeout: 700
            },
            font: {
                name: 'bungee',
                size: '4rem',
                weight: '300',
                style: 'italic',
                color: '#dfe70d'
            }
        },
        {
            elements: [
                {
                    content: 'I\'m Gummi',
                    font: {
                        color: '#dfe70d',
                        theme: 'purple'
                    },
                    animation: {
                        timeout: 400
                    }
                },
                {
                    content: 'and I do',
                    font: {
                        color: '#11e0c8',
                        theme: 'purple'
                    },
                    animation: {
                        timeout: 300
                    }
                },
                {
                    content: 'web',
                    font: {
                        color: '#dd6aff'
                    }
                }
            ],
            animation: {
                mode: 'incremental' as const,
                type: 'fade-in-lower' as const,
                easing: 'ease-in-out' as const,
                duration: {
                    mode: 'per-character' as const,
                    amount: 200
                },
                timeout: 1000
            },
            font: {
                name: 'bungee',
                size: '4rem',
                weight: '300',
                style: 'italic',
                color: '#eebb58'
            },
            // Determines which block to show when the carousel config is set
            // to "replayOnRevisit: false", and a carousel is revisited
            showOnRevisit: true
        }
    ]
};