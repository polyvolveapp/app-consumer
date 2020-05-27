const withTM = require("next-transpile-modules")("polyvolve-ui")
const withPlugins = require("next-compose-plugins")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const path = require("path")

module.exports = withPlugins([[withTM]], {
  webpack(config) {
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      )
    }

    config.module.rules.push({
      test: /\.isvg$/,
      use: "raw-loader",
    })

    config.resolve.alias["components"] = path.join(
      __dirname,
      "src",
      "components"
    )
    config.resolve.alias["style"] = path.join(__dirname, "src", "style")

    return config
  },
})