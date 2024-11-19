/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Allow loading images from localhost
        domains: ['localhost'],
        // Disable optimization for static export
        unoptimized: true,
    },
    output: 'export'
};

export default nextConfig;
