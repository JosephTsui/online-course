import path from 'path';
import ip from 'ip';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as constants from './constants.webpack';

const projectRoot = path.join(__dirname, '..');
const appEntry = './src/client/main.js';

export default function makeWebpackConfig(config) {
    const serverIp = ip.address();
    const { NODE_ENV } = config;
    const isProduction = NODE_ENV === 'production';
    const hotServer = `http://${serverIp}:8080`;
    const year = (new Date()).getFullYear();

    const plugins = [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'${NODE_ENV}'`
            }
        })
    ];

    if (isProduction) {
        plugins.push(
            new webpack.BannerPlugin(`@copyright RadioFlux Inc. ${year} all Rights Reserved`, {
                entryOnly: true
            }),
            new ExtractTextPlugin('[name].css', {
                allChunks: true,
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: false
                }
            })
        );
    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        );
    }

    return {
        plugins,
        cache: !isProduction,
        debug: !isProduction,
        resolve: {
            root: projectRoot,
            extensions: [
                '',
                '.js',
                '.json',
                '.jsx'
            ],
            modulesDirectories: ['node_modules']
        },
        entry: {
            app: isProduction ? [appEntry] : [
                `webpack-hot-middleware/client?path=${hotServer}/__webpack_hmr`,
                appEntry
            ]
        },
        output: {
            publicPath: isProduction ? '/dist/' : `${hotServer}/dist/`,
            path: path.join(projectRoot, 'dist'),
            filename: '[name].js',
            chunkFilename: '[id].js'
        }
        module: {
            loaders: [{
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: [
                        'transform-object-rest-spread',
                        ['transform-runtime', {
                            helpers: false,
                            polyfill: false,
                            regenerator: true
                        }]
                    ]
                }
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.css$/,
                loader: isProduction ?
                    ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') :
                    'style-loader!css-loader!postcss-loader'
            }, {
                test: /\.png$/,
                loader: 'url-loader',
                query: {
                    mimetype: 'image/png'
                }
            }]
        }
    };
}
