const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const alias = {
  'components': path.resolve('./src/components'),
  'global': path.resolve('./src/global')
}

module.exports = env => {
  return ({
    entry: './src/main.jsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx?)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['env', {'modules': false}], 'react', 'stage-0']
              }
            }
          ]
        },
        {
          test: /\.css/,
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          }))
        },
        {
          test: /\.styl/,
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'stylus-loader']
          }))
        },
        {
          test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'media/[hash].[ext]'
              }
            }
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      host: process.env.HOST,
      port: '3000',
      open: true,
      inline: true,
      hot: true,
      overlay: true,
      stats: {
        version: false,
        modules: false,
        assets: false,
        hash: false
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        PRODUCTION: env.production
      }),
      new webpack.EnvironmentPlugin(['HOST']),
      new ExtractTextPlugin('bundle.css')
    ],
    resolve: {
      alias: alias
    }
  })
}
