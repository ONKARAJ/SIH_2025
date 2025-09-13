/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // Handle pannellum dynamic imports
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    // Optimize bundle splitting
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          pannellum: {
            test: /[\\/]node_modules[\\/]pannellum[\\/]/,
            name: 'pannellum',
            chunks: 'all',
            priority: 10,
          },
          googlemaps: {
            test: /[\\/]node_modules[\\/]@googlemaps[\\/]/,
            name: 'googlemaps',
            chunks: 'all',
            priority: 10,
          },
        },
      },
    };

    return config;
  },
  
  // Handle external resources
  images: {
    domains: [
      'pannellum.org',
      'maps.google.com',
      'maps.googleapis.com',
    ],
  },
  
  // Experimental features for better performance
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

module.exports = nextConfig;
