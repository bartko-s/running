import * as path from 'path'
import * as webpack from 'webpack'
import * as webpackDevServer from 'webpack-dev-server'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as autoprefixer from 'autoprefixer'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import * as cssnano from 'cssnano'

const protocol: 'https' | 'http' = 'http';
const serverUrl: string = '0.0.0.0';
const port: number = 8080;
const publicPath: string = "/static/build/";
const buildPath: string = path.join(__dirname, 'static/build');


function postCssLoader(isDevelopment: boolean): webpack.Loader {
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

function buildConfig(isDevelopment: boolean): webpack.Configuration & webpackDevServer.Configuration {
    return {
        mode: isDevelopment ? 'development' : 'production',
        cache: isDevelopment,
        devtool: isDevelopment ? 'eval-source-map' : false,
        entry: {
            index: [path.join(__dirname, 'static/app.tsx')],
        },
        resolve: {
            extensions: ['*', '.ts', '.tsx', '.js', '.json', '.jsx'],
            alias: {
                'react-dom': isDevelopment ? '@hot-loader/react-dom': 'react-dom'
            }
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
                            {loader: 'css-loader'},
                            postCssLoader(isDevelopment),
                            {loader: 'sass-loader'}
                        ]
                },
                {
                    test: /\.(gif|jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            fallback: 'file-loader',
                        }
                    }]
                }
            ],
        },
        output: {
            filename: '[name].bundle.js',
            path: buildPath,
            publicPath: isDevelopment ? protocol+'://'+serverUrl+':'+port+publicPath : publicPath
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /node_modules/,
                        name: "vendor",
                        chunks: "all",
                        enforce: true,
                    }
                }
            }
        },
        plugins: isDevelopment ?
            [
                new CleanWebpackPlugin(),
                new webpack.HotModuleReplacementPlugin(),
            ] : [
                new CleanWebpackPlugin(),
                new MiniCssExtractPlugin({
                    filename: "[name].styles.css"
                }),
            ],
        devServer: isDevelopment ? {
            proxy: {
                ['!'+publicPath+'*']: {
                    target: protocol+'://node-server:8082',
                    secure: false
                }
            },
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            host: serverUrl,
            overlay: true,
            publicPath: protocol+'://'+serverUrl+':'+port+publicPath,
            hot: true,
            port: port,
            https: protocol === 'https'
        } : {}
    };
}

export default function(env: undefined, argv: webpack.Configuration) {
    const config = buildConfig(argv.mode === 'development');
    // console.log(config);
    return config
}
