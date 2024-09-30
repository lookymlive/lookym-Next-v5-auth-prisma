/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Ajusta este valor según tus necesidades
    },
  },
};

export default nextConfig;
