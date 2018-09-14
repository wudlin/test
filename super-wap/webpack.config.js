'use strict'
const path = require('path');
const webpack = require('webpack')
module.exports={
    devtool:'eval-source-map',
    entyu:{
        main:'./src/entry.js'
    },
    output:{
        path:'./build',
        filename:'main.js',
        publicPath:'http://localhost:8080/build'
    },
    devServer:{
        port:8080,
        color:true,
        historyApiFallback:true,
        inline:true
    },
    moudule:{
        loaders:[
            { test: /\.(js|jsx)$/, loaders:'eslint-loader',include:/src/},
            { test: /\.(css|less)$/, loader:['style-loader','css-loader']},
            {test:/\.(jpg|png|jpeg|bmp|gif)$/,loader:'url-loader?limit=8192'}
        ]
    },
    postcss:[
        require('autoprefixer')
    ],
    resolve:{
        extensions:['','.js','.json','coffee']
    }
}