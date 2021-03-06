var config = {
    "key": "test",
    "title": "p-uc",
    "engine": "mockjs",
    "mockDir": "./mocks/",
    "states": {
        "prod": "http://www.baidu.com",
        "test": "http://www.baidu.com",
        "dev": "http://www.baidu.com",
        "stag": "http://www.baidu.com"
    },
    "state": "dev",
    "interfaces": [{
        "key": "login",
        "title": "登陆接口",
        "method": "GET",
        "path": "/passport/login",
        "config": {
            "test": "test-1"
        }
    }]
};

var modelProxy = require("modelproxy").modelProxy;
var MockjsEngine = require("../dist/node").MockEngine;
var path = require("path");

function NodeEngine() {}
NodeEngine.prototype = {
    validate: function() {
        return true;
    },
    proxy: function(instance) {
        return require((instance.mockDir + "/" + instance.ns + "/" + instance.path + ".js").replace(/\/\//ig, "/"));
    }
};

var engine = new MockjsEngine(new NodeEngine());

modelProxy.engineFactory.add("mockjs", engine);

var proxy = new modelProxy.Proxy();

proxy.loadConfig(config).then((result) => {
    return result.getNs("test");
}).then((result) => {
    if (!result) {
        return;
    }
    return result.login({
        data: { usename: "1", password: "111111" },
        params: {},
        instance: { engine: "mockjs", mockDir: path.resolve(__dirname, "./mocks/") }
    });
}).then((result) => {
    console.info(JSON.stringify(result));
}).catch(console.error);