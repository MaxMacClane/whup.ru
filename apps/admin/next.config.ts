import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    // Находим и удаляем существующее правило для SVG
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test?.test?.('.svg'),
    );

    config.module.rules = config.module.rules.map((rule) => {
      if (rule === fileLoaderRule) {
        return {
          ...rule,
          exclude: /\.svg$/i,
        };
      }
      return rule;
    });

    // Добавляем SVGR
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
