import webpack from 'webpack';
import Config from 'webpack-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import theme from '../theme'

export default new Config().merge({
    output: {
        path: __dirname + '/../static'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test:   /\.css$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader"]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', 
                        options: { 
                            importLoaders: 1 
                        } 
                    },
                    { loader: "less-loader",
                        options: {
                            modifyVars: theme
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        // new webpack.ContextReplacementPlugin(
        //     /moment[\/\\]locale$/,
        //     /de|fr|hu/
        // ),
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './render/index.html',
            inject: "body"
        })
    ]
});


