/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://forum.cfx.re/**'), new URL('https://dunb17ur4ymx4.cloudfront.net/**')],
  },
};

export default nextConfig;
