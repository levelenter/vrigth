var webpack = require('webpack');
var path = require("path");

module.exports = {
  mode:"production",
  entry: {
    'main' : './client/main'
  },
  output: {
    path: __dirname + '/public',
    filename: '[name]_bundle.js',
    chunkFilename: '[name].bundle.js',
    // 外部ファイルの読込先
		publicPath: "/public/"
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }), // eslint loader error suppless in webpack4
    // ,new webpack.optimize.UglifyJsPlugin() 
  ],  

  resolve: {
    modules: [
      path.join(__dirname, "client"),
      "node_modules"
    ]
  }
};
// module.exports.devtool = 'inline-source-map';
if (process.env.NODE_ENV !== 'production') {
  module.exports.devtool = 'inline-source-map';
  module.exports.mode = "development";
}
console.log(module.exports);

