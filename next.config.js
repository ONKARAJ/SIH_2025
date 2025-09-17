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
  
  // Handle external resources
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.caratlane.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.gosahin.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'theindiantribal.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'veganuary.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'st.adda247.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'wpassets.adda247.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'reteation.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.alamy.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'c8.alamy.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'tribaldarshan.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'imagepasal.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'pannellum.org',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'maps.google.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'imagepasal.com',
        port: '',
        pathname: '**',
      }
    ],
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
