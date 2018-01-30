import webpack from 'webpack';
import Config from 'webpack-config';
import CleanWebpackPlugin from 'clean-webpack-plugin';

export default new Config().extend('conf/webpack.base.config.js').merge({
    entry: ['babel-polyfill', 
                __dirname + '/../front/index.js'],
    output: {
        publicPath: 'http://wh3.dev-base.ru/',
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
            exclude: ['.well-known', 'files', 'img', 'script', 'style', 'index.html', 'site.html']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});