import webpack from 'webpack';
import Config from 'webpack-config';
const CleanWebpackPlugin = require('clean-webpack-plugin');

export default new Config().extend('conf/webpack.base.config.js').merge({
    entry: ['babel-polyfill', 
                './client/index.js'],
    output: {
        publicPath: 'https://wh2.dev-base.ru/',
        filename: '[hash].min.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CleanWebpackPlugin(['static'], {
            root: __dirname + '/../',
            exclude: ['index.html']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});