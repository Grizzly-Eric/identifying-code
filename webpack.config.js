module.exports = {
    entry:'./app/app.js',
    output:{
        path:__dirname ,
        filename:'build.js'
    },
    devtool:'source-map',
    module:{
        loaders:[
            {test:/\.js$/,exclude:/node_modules/,loader:'react-hot!babel'},
            {test:/\.css$/,exclude:/node_modules/,loader:'style!css'},
            {test:/\.less$/,exclude:/node_modules/,loader:'style-loader!css-loader!less-loader'},
            {test:/\.html$/,exclude:/node_modules/,loader:'html!'}
        ]
    }
};
