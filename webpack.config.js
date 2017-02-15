const webpack = require('webpack');

module.exports = {
    context: __dirname + '/',
    cache: true,
    target: "web",
    entry: {
        'index': __dirname + '/src/index.ts'
    },
    devtool: 'source-map',
    // node: {
    //     __filename: true,
    //     __dirname: true
    // },
    output: {
        path: __dirname + '/dist/',
        filename: 'web.js',
        // library: "modelProxy",
        libraryTarget: 'umd'
    },
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    externals: [{
        "modelproxy": {
            root: "modelProxy",
            commonjs2: "modelproxy",
            commonjs: ["modelproxy"],
            amd: "modelproxy"
        }
    }, {
        "mockjs": {
            root: "Mock",
            commonjs2: "mockjs",
            commonjs: ["mockjs"],
            amd: "mockjs"
        }
    }, {
        "lodash": {
            root: "_",
            commonjs2: "lodash",
            commonjs: ["lodash"],
            amd: "lodash"
        }
    }],
    plugins: [
        new webpack.ProvidePlugin({
            modelProxy: "modelProxy",
            Mock: "Mock"
        })
    ]
}