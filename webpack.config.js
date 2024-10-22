const path = require('path');

module.exports = {
  // ... other configurations ...
  resolve: {
    fallback: {
        timers: require.resolve('timers-browserify'),
        stream: require.resolve('stream-browserify'),
        os: require.resolve('os-browserify/browser'),
        zlib: require.resolve('browserify-zlib'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        fs: false, // or provide an empty module
        net: false, // or provide an empty module
        tls: false, // or provide an empty module
        dns: false, // or provide an empty module
    },
},

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Other loaders as needed
    ],
  },
};
