/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // config.module.rules.push({
        //     test: /\.node/,
        //     use: 'raw-loader',
        // });
        config.resolve.alias.canvas = false;
        return config;
    },
}

module.exports = nextConfig
