 var path = require('path');
 module.exports = {
    //cache: true,
    //debug: true,
    //devtool: 'eval',
    //entry: './lccSource/javascript/**/*.js',
    output: {
        path: path.join(__dirname, "build"),
        //path: './lccDest/javascript',
        filename: 'application.js'
    },
    //module: {
    //    loaders: [
    //        { test: /\.handlebars$/, loader: "handlebars-loader" }
    //    ]
    //}
    //resolve: {
   	//    extensions: ['', '.js', '.json', '.coffee']
    //}
 };