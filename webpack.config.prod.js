import path from 'path';
import webpack from 'webpack';

export default {
  mode: "production",
  devtool: 'source-map',
  devServer: {
    noInfo: false,
  },
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          beautify: false,
          compress: true,
          comments: false,
          mangle: false,
          toplevel: false,
          keep_classnames: true, // <-- doesn't exist, I guess. It's in harmony branch
          keep_fnames: true //
        }
      })
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
  ],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style-loader','css-loader']}
    ]
  }
}
