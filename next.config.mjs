/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'www.rosuson.com'],
    },
    async headers() {
        return [
            {
                source: '/videos/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        // Cache for 3 months
                        value: 'public, max-age=7776000, immutable',
                    },
                ],
            },
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        // Cache for 3 months
                        value: 'public, max-age=7776000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
