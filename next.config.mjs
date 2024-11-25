/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "vqurdqh5odkugaia.public.blob.vercel-storage.com",
                port: '',
            }
        ]
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '8mb',
        }
    }
};

export default nextConfig;
