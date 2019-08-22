
            const path = require('path')
            const fs = require('fs')
            const nodeExternals = require('webpack-node-externals')
            const autoprefixer = require('autoprefixer')
            const ExtractTextPlugin = require('extract-text-webpack-plugin')
            const CleanWebpackPlugin = require('clean-webpack-plugin')
            const appDirectory = fs.realpathSync(process.cwd())
            const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
            module.exports = {
            entry: './src/index.js',
            output: {
                filename: 'KY.min.js',
                path: path.resolve(__dirname, '../dist'),
                libraryTarget: 'commonjs2'
            },
            module: {
                rules: [
                {
                    test: /.(js|jsx|mjs)$/,
                    enforce: 'pre',
                    use: [
                        {
                          options: {
                            eslintPath: require.resolve('eslint'),
                            failOnError: true,
                            failOnWarning: true
                          },
                          loader: require.resolve('eslint-loader')
                        }
                    ]
                },
                {
                    test: /.css$/,
                    use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                    })
                },
                {
                    oneOf: [
                    {
                        test: /.(js|jsx|mjs)$/,
                        use: 'babel-loader',
                        exclude: /node_modules/
                    },
                    {
                        test: [/.bmp$/, /.gif$/, /.jpe?g$/, /.jpg$/,/.png$/, /.svg$/],
                        loader: require.resolve('url-loader'),
                        options: {
                        limit: 10000,
                        name: 'assets/[name].[hash:8].[ext]'
                        }
                    },
                    {
                        test: /.(js|jsx|mjs)$/,
                        include: resolveApp('src'),
                        loader: require.resolve('babel-loader'),
                        options: {
                        plugins: ['transform-decorators-legacy'],
                        compact: true
                        }
                    },
                    {
                        test: /.css$/,
                        use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                            importLoaders: 1
                            }
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9' // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009'
                                })
                            ]
                            }
                        }
                        ]
                    },
                    {
                        test: /.less$/,
                        use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                            importLoaders: 1
                            }
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9' // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009'
                                })
                            ]
                            }
                        },
                        require.resolve('less-loader')
                        ]
                    }
                    ]
                },
                {
                    loader: require.resolve('file-loader'),
                    exclude: [/.(js|mjs|jsx|ts|tsx)$/, /.html$/, /.json$/, /.less$/],
                    options: {
                    name: 'static/media/[name].[hash:8].[ext]'
                    }
                }
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx', '.json'],
                alias: {
                assets: path.resolve(__dirname, '../src/assets'),
                components: path.resolve(__dirname, '../src/components'),
                config: path.resolve(__dirname, '../src/config'),
                constant: path.resolve(__dirname, '../src/constant'),
                locale: path.resolve(__dirname, '../src/locale'),
                utils: path.resolve(__dirname, '../src/utils')
                },
                mainFiles: ['index']
            },
            plugins: [
                new CleanWebpackPlugin(resolveApp('dist')),
                new ExtractTextPlugin('css/KY.css')
            ],
            externals: [nodeExternals()]
            }