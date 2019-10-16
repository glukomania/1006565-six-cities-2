const path = require(`path`);
const webpack = require(`webpack`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    open: true,
    port: 1330,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  devtool: `source-map`,

  resolve: {
    modules: [
      `node_modules`,
      path.resolve(path.join(__dirname, `public`))
    ],
    extensions: [`.js`, `.jsx`, `.ts`, `.tsx`, `.webm`],
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: `react`,
      cx: `classnames`
    })
  ]

};


