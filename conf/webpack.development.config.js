import webpack from 'webpack';
import Config from 'webpack-config';

const SERVER = 'http://localhost:8000/'

export default new Config().extend('conf/webpack.base.config.js').merge({
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        'babel-polyfill',
        __dirname + '/../front/index.js'
    ],
    devtool: 'inline-source-map',
    output: {
        publicPath: 'http://localhost:8000/',
        filename: 'bundle.js'
    },
    // module: {
    //     rules: [{
    //         test: /\.css$/,
    //         use: [{ 
    //                 loader: 'style-loader' 
    //             },
    //             {
    //                 loader: 'css-loader',
    //                 options: {
    //                     modules: true,
    //                     importLoaders: 1,
    //                     localIdentName: "[local]__[hash:base64:5]",
    //                     minimize: false
    //                 }
    //             },
    //             { 
    //                 loader: 'postcss-loader' 
    //             }
    //         ]
    //     }]
    // },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            SERVER: JSON.stringify(SERVER)
        }),
    ]
});