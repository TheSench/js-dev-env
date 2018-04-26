import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  mode: "production",
  devtool: 'source-map',
  devServer: {
    noInfo: false,
  },
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        // https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
        uglifyOptions: {
          keep_classnames: true,
          keep_fnames: true,
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
          }
      }
    }
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
    }),
  ],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style-loader','css-loader']}
    ]
  }
};
