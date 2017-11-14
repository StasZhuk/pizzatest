const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devServ = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const minifyCSS = require('./webpack/css.minify');
const babel = require('./webpack/babel');
const fonts = require('./webpack/fonts');


const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/pages/index/index.js'
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index','common'],
                template: PATHS.source + '/pages/index/index.pug'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            })   
        ]
    },
    fonts(),
    pug(),
    images(),
    babel()
]);

module.exports = function(env) {
    if(env === "production") {
        return merge([
            common,
            extractCSS(),
            minifyCSS(),
            // uglifyJS()
        ])
    }
    if(env === "development") {
        return merge([
            common,
            devServ(),
            sass(),
            css(),
            minifyCSS()
        ])
    }
};
