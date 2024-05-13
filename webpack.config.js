const slsw = require('serverless-webpack');
const Dotenv = require('dotenv-webpack');

const backendConfig = {
  entry: slsw.lib.entries,
  target: 'node',
  module: {
    rules: [{ test: /\.(js)x?$/, loader: 'babel-loader' }],
  },
  plugins: [new Dotenv()],
};

module.exports = backendConfig;
