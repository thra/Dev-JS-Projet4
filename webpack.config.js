const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const sharedHtmlWebpackConf = name => {
  const result = name === 'index' ? {} : { chunks: ['main'] }
  result.favicon = path.resolve(__dirname, './src/assets/favicon.png')
  result.template = path.resolve(__dirname, `./src/html/${name}.html`)
  result.filename = `${name}.html`
  return result
}

const config = {
  entry: {
    main: path.resolve(__dirname, './src/app.js')
  },
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: '[name].bundle.js',
    publicPath: '',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true
  },
  devServer: {
    port: 8090,
    compress: false,
    static: {
      directory: path.join(__dirname, '/')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(sharedHtmlWebpackConf('index', 'GameOn')),
    // Define global variable from NODE_ENV for the app
    new webpack.DefinePlugin({
      DEBUG: process.env.NODE_ENV === 'development',
      VERSION: JSON.stringify(require('./package.json').version)
    })
  ],
  module: {
    // https://github.com/jantimon/html-webpack-plugin/blob/main/examples/custom-template/template.html
    rules: [
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      // https://webpack.js.org/loaders/css-loader/
      {
        test: /\.css$/,
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader' // Translates CSS into CommonJS
        ]
      },
      // https://stackoverflow.com/questions/67432536/webpack-5-how-to-display-images-in-html-file
      {
        test: /\.(png|svg|jpg|jpeg|gif|otf|cur|mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      }
    ]
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : 'eval-source-map'
}

module.exports = (env, argv) => {
  console.log(`mode = ${argv.mode}, NODE_ENV = ${process.env.NODE_ENV}`)

  return config
}
