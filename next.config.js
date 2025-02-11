const nextConfig = {
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false, 
    };
    return config;
  },
};

module.exports = nextConfig;
