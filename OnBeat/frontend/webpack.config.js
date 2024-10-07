const path = require("path");
const webpack = require("webpack");

module.exports = {
    // the entry point is in the source directory 
  entry: "./src/index.js",
  output: {
    // get the current directory we are in, relative path > static > frontend folder
    // that is where the output file is going to be
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  // exclude bundling the modules folder
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use babel loader when using all of this
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    // taking our javascript and minimising it 
    // a lot of js, will take a long time to load in the browser
    minimize: true,
  },
  // for optimisation
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};