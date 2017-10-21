const path = require('path')

module.exports = {
  entry: {
    example: './src/index.jsx'
  },

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  // Allows us to do `import foo from 'foo'` rather than `import foo from 'foo.js'`
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ]
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    // HTML app-shell that bootstraps the React app
    new (require('html-webpack-plugin'))({
      title: 'EatPayLove',
      template: './src/index.html',
      appCacheManifest: '/auto.appcache'
    }),
    new (require('copy-webpack-plugin'))([{
      from: 'assets'
    }])
  ],

  devServer: {
    host: 'jonathans-macbook.local'
  }
}
