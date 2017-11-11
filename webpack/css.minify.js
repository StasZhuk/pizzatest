const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function(paths) {

    return {
        module: {
            loaders: [
                { 
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })  
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('./css/[name].css'),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.min\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: {removeAll: true } },
                canPrint: true
            })
        ]
    }
}
