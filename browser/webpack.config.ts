import * as path from 'path'
import * as webpack from 'webpack'
import * as webpackDevServer from 'webpack-dev-server'
import autoprefixer from 'autoprefixer'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import cssnano from 'cssnano'

const protocol: 'https' | 'http' = 'http';
const serverUrl: string = '0.0.0.0';
const port: number = 8080;
const publicPath: string = "/static/build/";
const buildPath: string = path.join(__dirname, 'static/build');

const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

function postCssLoader(isDevelopment: boolean): webpack.RuleSetUseItem {
    return {
        loader: 'postcss-loader',
        options: {
            sourceMap: isDevelopment,
            postcssOptions: {
                plugins: isDevelopment ? [
                    autoprefixer()
                ] : [
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
        devtool: isDevelopment ? 'inline-source-map' : false,
        entry: {
            index: [
                'react-hot-loader/patch',
                path.join(__dirname, 'static/app.tsx')
            ],
        },
        resolve: {
            extensions: ['*', '.ts', '.tsx', '.js', '.json', '.jsx'],
            alias: {
                'react-dom': isDevelopment ? '@hot-loader/react-dom': 'react-dom'
            }
        },
        target: isDevelopment ? 'web' : 'browserslist', // upravit ked bude fix na https://github.com/webpack/webpack-dev-server/issues/2758
        module: {
            rules: [
                {
                    test: /\.(t|j)sx?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: {
                        "presets": [
                            "@babel/preset-env",
                            [
                                "@babel/preset-react",
                                {
                                    development: isDevelopment,
                                },
                            ],
                            "@babel/preset-typescript",
                        ],
                        "plugins": [
                            "react-hot-loader/babel",
                            "@babel/plugin-transform-runtime",
                            "transform-class-properties",
                            [
                                "babel-plugin-styled-components",
                                {
                                    "displayName": isDevelopment,
                                }
                            ],
                        ]
                    }
                },
                {
                    test: /\.(t|j)sx?$/,
                    loader: 'source-map-loader',
                    enforce: 'pre'
                },
                {
                    test: /\.(css|scss|sass)$/,
                    use: isDevelopment ?
                        [
                            {
                                loader: ExtractCssChunks.loader,
                                options: {
                                    publicPath: publicPath,
                                    hmr: true,
                                    reloadAll: true,
                                }
                            },
                            {loader: 'css-loader', options: {sourceMap: true}},
                            postCssLoader(isDevelopment),
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                    sassOptions: {
                                        outputStyle: 'compressed',
                                    },
                                }
                            }
                        ] : [
                            {
                                loader: ExtractCssChunks.loader,
                                options: {
                                    publicPath: publicPath,
                                }
                            },
                            {loader: 'css-loader'},
                            postCssLoader(isDevelopment),
                            {
                                loader: 'sass-loader',
                                options: {
                                    sassOptions: {
                                        outputStyle: 'compressed',
                                    },
                                }
                            }
                        ]
                },
                {
                    test: /\.(gif|jpg|jpeg|png|svg)$/,
                    use: [{
                        loader: 'file-loader',
                    }]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [{
                        loader: 'file-loader',
                    }]
                }
            ],
        },
        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[id].bundle.[chunkhash].js',
            path: buildPath,
            publicPath: isDevelopment ? protocol+'://'+serverUrl+':'+port+publicPath : publicPath
        },
        plugins: isDevelopment ?
            [
                new CleanWebpackPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new ExtractCssChunks({
                    filename: "[name].styles.css",
                    chunkFilename: '[id].styles-chunk.css',
                })
            ] : [
                new CleanWebpackPlugin(),
                new ExtractCssChunks({
                    filename: "[name].styles.css"
                })
            ],
        devServer: isDevelopment ? {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            disableHostCheck: true,
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
