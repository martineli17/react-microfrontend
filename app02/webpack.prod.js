const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const { dependencies } = require("./package.json");

// yarn add serve ts-loader webpack webpack-cli html-webpack-plugin webpack-dev-server babel-loader

module.exports = (env, argv) => ({
  entry: "./src/index.ts",
  mode: 'production',
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
    name: "App02",
    filename: "moduleEntry.js",
    exposes: {
      "./App": "./src/App.tsx",
    },
    shared: {
      ...dependencies,
      react: {
        singleton: true,
        requiredVersion: dependencies["react"],
      },
      "react-dom": {
        singleton: true,
        requiredVersion: dependencies["react-dom"],
      },
    },
  }),
  new HtmlWebpackPlugin({
    template: "./public/index.html",
  }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  target: "web",
  output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'build'),
     clean: true,
   },
});