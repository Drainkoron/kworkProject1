import webpack from 'webpack';
import Config from 'webpack-config';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const SERVER = 'http://base.ipapai.ru'

export default new Config().extend('conf/webpack.base.config.js').merge({
    entry: ['babel-polyfill', 
                __dirname + '/../front/index.js'],
    output: {
        publicPath: 'http://base.ipapai.ru/',
        filename: '[hash].min.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            SERVER: JSON.stringify(SERVER)
        }),
        new CleanWebpackPlugin(['static'], {
            root: __dirname + '/../',
            exclude: ['.well-known', 'export', 'files', 'img', 'script', 'index.html']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});
