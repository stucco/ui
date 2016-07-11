const path = require('path')

const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const PATHS = {
  lib: path.join(__dirname, 'src/components'),
  example: path.join(__dirname, 'src')
}
const EXTERNALS = {
  react: {
    root: 'React',
    commonjs: 'react',
    commonjs2: 'react',
    amd: 'react'
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs: 'react-dom',
    commonjs2: 'react-dom',
    amd: 'react-dom'
  },
  d3: 'd3',
  'd3-tip': 'd3-tip'
}

// `npm run build` to build dist or `npm start` to run dev server.
const TARGET = process.env.npm_lifecycle_event

var env = process.env.NODE_ENV || 'development'
var isDev = env === 'development'
// Common to both starting dev server and building for production.
const common = {
  debug: isDev,
  devtool: isDev ? 'eval' : false,
  plugins: [
    new webpack.DefinePlugin({
      __SERVER__: isDev,
      __DEVELOPMENT__: isDev,
      __DEVTOOLS__: isDev,
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        BABEL_ENV: JSON.stringify(env)
      }
    }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: [
          PATHS.example,
          PATHS.lib
        ]
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
}

// Default configuration. We will return this if webpack is called outside
// of npm.
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    entry: {
      example: PATHS.example
    },
    devServer: {
      contentBase: PATHS.example,
      historyApiFallback: true,
      hot: true,
      compress: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT || 8080
    },
    plugins: [
      new HtmlPlugin({
        template: path.join(PATHS.example, 'index-template.html'),
        inject: 'body',
        filename: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  })
} else if (TARGET === 'buildDist' || TARGET === 'build') {
  module.exports = merge(common, {
    entry: {
      'vis.min': PATHS.lib
    },
    output: {
      libary: 'ornl-sava-vis',
      path: 'dist',
      libraryTarget: 'umd',
      filename: '[name].js',
      publicPath: '/'
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 51200 // ~50kb
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          warnings: false
        }
      })
    ],
    externals: EXTERNALS
  })
}
