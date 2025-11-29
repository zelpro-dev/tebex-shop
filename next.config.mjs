/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://forum.cfx.re/user_avatar/forum.cfx.re/**')],
  },
};

export default nextConfig;
