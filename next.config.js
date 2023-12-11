/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    swSrc: 'service-worker.js',
    dest: 'public'
})

const nextConfig = {
  reactStrictMode: true,
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
  swcMinify: true,
  images: {
    domains: [
        'upload.wikimedia.org',
        'images.hothardware.com',
        'cdn.shopify.com',
        'wmstatic.global.ssl.fastly.net',
        'img.helpforsmartphone.com',
        'fonts.googleapis.com',
        'consumer.huawei.com',
        'cdn.discordapp.com',
        'media.vorwerk.com',
        'www.plumeti.fr',
        "i-reg.unimedias.fr"
    ],
  },
};

module.exports = withPWA(
    nextConfig
);
