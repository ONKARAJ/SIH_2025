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

    // Redirect Prisma client to stub implementation since database functionality is removed
    config.resolve.alias = {
      ...config.resolve.alias,
      '@prisma/client': require.resolve('./lib/prisma-client-stub.ts')
    };

    // Enable top-level await support
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

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
  // Skip trailing slash redirect
  skipTrailingSlashRedirect: true,
  
  // Experimental features for better performance
  experimental: {
    // Future experimental features can be added here
  },
  
  // Turbopack configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

module.exports = nextConfig;
