const webpack = require('webpack')
const path = require('path')

const config = {
  outputDir: 'bundled'
}

module.exports = () =>  {
  let node_env = process.env.NODE_ENV
  let env = node_env ? node_env.replace(/ /g, "") : ""
  let isProduction = env === "production"
  let mode = isProduction ? "production" : "development"

  console.log("************** mode: " + mode + " **************")

  return {
    mode: mode,
    entry: {
      app: './src/main.js'
    },

    output: {
      path: path.resolve(__dirname, config.outputDir),
      filename: '[name].js',
      publicPath: './public'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        }
      ]
    }
  }
}