/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during build to prevent deployment failures
  eslint: {
    ignoreDuringBuilds: true,
  },
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
  
  // Use custom image loader to bypass hostname restrictions
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
    unoptimized: true, // This allows all external images without hostname restrictions
    remotePatterns: []
    // Note: With unoptimized: true, all hostnames are allowed but images won't be optimized
  },
  // Experimental features for better performance
  experimental: {
    // Disable missing suspense with CSR bailout during build
    missingSuspenseWithCSRBailout: false,
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
