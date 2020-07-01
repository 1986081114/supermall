const path = require('path')
const  webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //引入这行为了使用vue-loader
const htmlWebpackPlugin = require('html-webpack-plugin')//html打包插件
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    entry: __dirname + "/src/main.js",//项目入口文件
    mode: 'development', //开发
    output: {
        //绝对路径
        // path: __dirname + "/dist",
        path: path.resolve(__dirname, 'dist'),//配置输出文件路径
        filename: 'bundle.js',//配置输出文件名称
        // publicPath: 'dist/'//图片的路径 这个只在图片过大使用其余应注释，否则会影响其他打包如html
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.BannerPlugin("所学于2020-5-30"),
        new htmlWebpackPlugin({
            template: 'index.html'
        }),
        new UglifyWebpackPlugin
    ],

    module: {
        rules: [
            {
                // css-loader只负责将css文件加载
                // style-loader负责将样式添加到dom中
                // 使用多个loader，是从右向左
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.less$/,
                use: [
                    {loader:'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'less-loader'}

                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //当图片小于limit会将图片编译成base64的字符串格式
                            //当大于limit会将图片打包存到dist在dist会出现一堆数字字符命名的图片，由于路径图片无法找到，
                            // 需要下载npm install file-loader --save-dev
                            // 同时添加  publicPath: 'dist/'   这个东西添加在output里告诉图片的路径
                            //由于新创建在dist里的图片命名很乱所以可以规范  name
                            limit: 30000,
                            name: 'img/[name].[hash:8].[ext]'

                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']


            }
        ]
    },
    resolve: {
        alias: {
            //由于下载的vue有很多版本。在这里指定vue使用的版本
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        //配置提供本地服务的监听路径
        contentBase: './dist',
        inline: true
    }


}