module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
                    use: [ 
                        'style-loader', //creates style nodes from JS strings
                        'css-loader', // translates CSS into CommonJS
                        'sass-loader' // compiles Sass to CSS                        
                    ]
                }
            ]
        }
    };
}