module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include: paths,
                    use: [ 
                        'style-loader', //creates style nodes from JS strings
                        'css-loader', // translates CSS into CommonJS                      
                    ]
                }
            ]
        }
    };
}