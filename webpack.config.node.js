const webpack = require('webpack');

module.exports = {
    context: __dirname + '/',
    cache: true,
    target: "node",
    entry: {
        // 'vendor': ['lodash', 'tv4'],
        'index': __dirname + '/src/index.ts'
    },
    devtool: 'source-map',
    // node: {
    //     __filename: true,
    //     __dirname: true
    // },
    output: {
        path: __dirname + '/dist/',
        filename: 'node.js',
        // hash: true,
        // library: "modelProxy",
        libraryTarget: 'commonjs'
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
        // new webpack.IgnorePlugin(/tv4|lodash/i),
        // new webpack.ProvidePlugin({
        //     "tv4": "tv4",
        //     "_": "lodash"
        // }),
        // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ]
}