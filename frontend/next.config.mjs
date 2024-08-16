// /** @type {import('next').NextConfig} */
// const nextConfig = {

//   images: {
//     domains: ['avatar.iran.liara.run'],
//   }, 

//   async redirects() {
//     return [];
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatar.iran.liara.run'],
  }, 

  async redirects() {
    return [];
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/sounds',
          outputPath: 'static/sounds',
          name: '[name].[hash].[ext]',
          esModule: false,
        },
      },
    });

    return config;
  },
};

export default nextConfig;
