const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    devtool: 'inline-source-map',
    entry: {
        main: path.resolve(__dirname, './src/index.tsx'),
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new Dotenv({
            path: './.env',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/src/index.html'),
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    resolve: {
        extensions: [
            '.js', '.jsx', '.json', '.ts', '.tsx'
        ],
        fallback: {
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer'),

        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: path.join(__dirname, '/node_modules/'),
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            // {
            //     test: /\.css$/i,
            //     use: [
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 postcssOptions: {
            //                     plugins: ['postcss-url']
            //                 }
            //             }
            //         },
            //     ]
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg/,
                type: 'asset/inline',
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',

                // use: [
                //     {
                //         loader: 'file-loader',
                //     },
                // ],
            },
        ]
    },
    devServer: {
        historyApiFallback: true,

    }
}