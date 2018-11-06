const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ParallelUglifyPlugin  = require('webpack-parallel-uglify-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const NODE_ENV = process.env.NODE_ENV; //此处是nodejs 的环境 和 webpack process.env.NODE_ENV 的有区别
const MiniCss = NODE_ENV == 'production' ? [MiniCssExtractPlugin.loader] : ['style-loader'];
const dir = NODE_ENV == 'production' ? "lib" : "dist";
const pluginName = "vue-dialog-plugin";
const webpackConfig = {
    mode: NODE_ENV == 'production' ? 'production' : 'development',
    entry: NODE_ENV == 'production' ? "./src/components/index.js" : {"main" : "./src/app.js"},
    output: {
        path: path.resolve(__dirname, './'),
        publicPath: "/",
        filename: `${dir}/${pluginName}.js`,
        library: pluginName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.(jsx|js)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.css$/,
            exclude: '/node_modules/',
            use: [...MiniCss, 'css-loader'],
        }, {
            test: /\.scss$/,
            use: [...MiniCss, 'css-loader', 'sass-loader']
        },{
            test:/\.(png|svg|jpg|jpeg|gif)$/i,
            // use:[ {loader:'url-loader?limit=8192&name=build/images/[name].[hash:8].[ext]'} ]
            use : [{
                loader:'url-loader',
                options : {
                    limit: 8192,    // 把小于8192B的文件打成Base64的格式，写入JS
                    // outputPath: 'build/',
                    name: 'dist/images/[name].[hash:8].[ext]',  // 放在文件夹的路径及命名
                }
            }]
        }]
    },
    optimization : {
        minimizer : [
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                uglifyJS : {
        			output : {beautify: false,comments: false},
        			compress : { warnings: false}
        		},
                exclude : [/\/node_modules\//]
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                }
            })
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.css'],
        alias : {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename : `${dir}/${pluginName}.css`,
            chunkFilename: `${dir}/${pluginName}.css`,
        })
    ]
}

/*测试*/
if(NODE_ENV == 'development'){
    // 创建模板
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename : path.resolve(__dirname, './dist/views/index.html'),
            template : path.resolve(__dirname, './index.html'),
            chunks : ['main'],
            chunksSortMode : 'manual',
            inject : 'body',
        })
    );

    webpackConfig.devServer = {
        contentBase : path.resolve(__dirname, './dist/'),
        port : 8081,
        compress : true,
        open:true,
        openPage : 'dist/views/',
        inline : true,
    };
    webpackConfig.devtool = 'cheap-module-eval-source-map';
}

module.exports = webpackConfig;
