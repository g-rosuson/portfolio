export const configuration = {
    mode: 'show-one',
    loop: false,
    startAt: 0,
    replayOnRevisit: false,
    id: 'home-carousel',
    blocks: [
        {
            elements: [
                {
                    content: 'Hi there!',
                    font: {
                        color: 'var(--color-yellow)'
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
                        color: 'var(--color-yellow)'
                    },
                    animation: {
                        timeout: 400
                    }
                },
                {
                    content: 'and I do',
                    font: {
                        color: 'var(--color-green)'
                    },
                    animation: {
                        timeout: 300
                    }
                },
                {
                    content: 'web',
                    font: {
                        color: 'var(--color-purple)'
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