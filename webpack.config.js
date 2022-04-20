const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

const API_URLS = {
    development: 'http://localhost:3000'
};

const API_URL = JSON.stringify(API_URLS[process.env.NODE_ENV]); // must stringify but I'm not sure why!

const sharedHtmlWebpackConf = name => {
    const result = name === "index" ? {} : { chunks: ["main"] };
    result.favicon = path.resolve(__dirname, './src/Logo.png');
    result.template = path.resolve(__dirname, `./src/${name}.html`);
    result.filename = `${name}.html`;
    return result;
};

const config = {
    entry: {
        main: path.resolve(__dirname, './src/app.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    devServer: {
        port: 8087,
        contentBase: path.join(__dirname, 'build/'),
        compress: false,
        historyApiFallback: true,
        publicPath: '/',
        watchOptions: {
            poll: true
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(sharedHtmlWebpackConf("index")),
        // Define global variable from NODE_ENV for the app
        new webpack.DefinePlugin({
            DEBUG: process.env.NODE_ENV === "development",
            API_URL
        })
    ],
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] }
                },
                exclude: file => (
                    /node_modules/.test(file)
                ),
            },
            {
                test: /\.(html)$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        // https://github.com/webpack-contrib/html-loader
                        interpolate: "require" // can be true to interpolate all or "require" to just interpolate require
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader' // translates CSS into CommonJS
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|otf|cur)$/,
                loader: "file-loader"
            }
        ]
    },
    devtool: '#eval-source-map'
};

module.exports = (env, argv) => {

    console.log(`mode = ${argv.mode}, NODE_ENV = ${process.env.NODE_ENV}`);

    return config;
};