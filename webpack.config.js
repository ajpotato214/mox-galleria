const slsw = require('serverless-webpack');

const backendConfig = {
  entry: slsw.lib.entries,
  target: 'node',
  module: {
    rules: [{ test: /\.(js)x?$/, loader: 'babel-loader' }],
  },
};

module.exports = backendConfig;