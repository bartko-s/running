const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cssnano = require('cssnano');


function postCssLoader(isDevelopment) {
    return {
        loader: 'postcss-loader',
        options: {
            sourceMap: isDevelopment,
            plugins: function () {
                return [
                    autoprefixer(),
                    cssnano()
                ]
            }
        }
    }
}

function buildConfig(isDevelopment) {
    return {
        mode: isDevelopment ? 'development' : 'production',
        cache: isDevelopment,
        devtool: isDevelopment ? 'eval-source-map' : false,
        entry: {
            index: [path.join(__dirname, 'src/static/app.tsx')],
        },
        resolve: {
            extensions: ['*', '.ts', '.tsx', '.js', '.json', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.(t|j)sx?$/,
                    exclude: /node_modules/,
                    use : ['awesome-typescript-loader?module=es6']
                },
                {
                    test: /\.js$/,
                    loader: 'source-map-loader',
                    enforce: 'pre'
                },
                {
                    test: /\.(css|scss)$/,
                    use: isDevelopment ?
                        [
                            'style-loader',
                            {loader: 'css-loader', options: {sourceMap: true}},
                            postCssLoader(isDevelopment),
                            {loader: 'sass-loader', options: {sourceMap: true}}]
                        : [
                            MiniCssExtractPlugin.loader,
                            {loader: 'css-loader', options: {minimize: true,}},
                            postCssLoader(isDevelopment),
                            {loader: 'sass-loader'}
                        ]
                },
                {
                    test: /\.(gif|jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                    use: ['url-loader?limit=100000']
                }
            ],
        },
        output: {
            filename: '[name].bundle.js',
            path: path.join(__dirname, '/src/static/build/'),
            publicPath: isDevelopment ? 'http://localhost:8080/static/build/' : '/static/build/'
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "all"
                    }
                }
            }
        },
        plugins: isDevelopment ?
            [
                new CleanWebpackPlugin(['src/static/build']),
                new webpack.HotModuleReplacementPlugin(),
            ] : [
                new CleanWebpackPlugin(['src/static/build']),
                new MiniCssExtractPlugin({
                    filename: "[name].styles.css"
                }),
            ],
        devServer: isDevelopment ? {
            open: true,
            overlay: true,
            contentBase: path.join(__dirname, 'src'),
            publicPath: 'http://localhost:8080/static/build/',
            hot: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        } : {}
    };
}

module.exports = function(env, argv) {
    const config = buildConfig(argv.mode === 'development');
    // console.log(config);
    return config
};
