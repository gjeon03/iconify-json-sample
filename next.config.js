/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,

  compress: true,

  //https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
    };
    let prod = process.env.NODE_ENV === "production";
    return {
      ...config,
      // mode: prod ? "production" : "development",
      // devtool: prod ? "hidden-source-map" : "eval",
      // plugins: [
      //   ...config.plugins,
      //   new webpack.ContextReplacementPlugin(
      //     /@iconify[/\\]locale$/,
      //     /^\.\/ko$/
      //   ),
      // ],
    };
  },
};

module.exports = withBundleAnalyzer(nextConfig);
