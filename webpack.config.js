const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

//load 'package.json' so you we can use 'dependencies' from there 
const pkg = require('./package.json')

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    //output using entry name
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: 'node_modules/html-webpack-template/index.html',
      title: 'Kanban app',
      appMountId: 'app'
    })
  ]
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {
    //defind vendor entry point needed for splitting
    entry:{
      vendor: Object.keys(pkg.dependencies).filter(function(v){
        //Exclude alt-utils as it won't work with this setup
        //due to the way package is designed (no package.json main)
        return v !== 'alt-utils'
      })
    },
    plugins: [
      //Extract vendor and manifest files
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest']
      }),
      //Setting DefinePlugin affects React library size!
      //DefinePlugin replaces content "as is" so we need some extra quotes
      //for the generated code to make sense
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      //you can set this to JSON.stringy('development') for your 
      //development target to force NODE_ENV to development mode
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}