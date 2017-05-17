"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Mock = require("mockjs");
var modelproxy_1 = require("modelproxy");
// import { IProxyCtx } from "../../modelproxy/libs/models/proxy.ctx";
var MockEngine = (function (_super) {
    __extends(MockEngine, _super);
    /**
     * 构造
     * @param mockEngine   {ModelProxy.IEngine}  用于获取mock数据的engine
     */
    function MockEngine(mockEngine) {
        var _this = _super.call(this) || this;
        _this.mockEngine = mockEngine;
        _this.init();
        return _this;
    }
    /**
     * 验证数据准确性
     * @param instance   {ModelProxy.IInterfaceModel}  接口实例
     * @param options    {ModelProxy.IExecute}         执行的参数
     * @return           {boolean}
     */
    MockEngine.prototype.validate = function (instance, options) {
        if (!this.mockEngine) {
            throw new modelproxy_1.modelProxy.errors.ModelProxyMissingError("没有设置mock的默认引擎！");
        }
        _super.prototype.validate.call(this, instance, options);
        return true;
    };
    /**
     * 初始化中间件函数
     */
    MockEngine.prototype.init = function () {
        var _this = this;
        // 调用engine来请求数据
        this.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            var mockInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mockEngine.proxy(Object.assign({}, ctx.instance, {
                            path: "" + ctx.instance.mockDir,
                            method: "GET"
                        }), Object.assign({}, ctx.executeInfo, {
                            settings: {
                                dataType: "text"
                            },
                            params: {
                                path: ctx.instance.ns + "/" + ctx.instance.key
                            }
                        }))];
                    case 1:
                        mockInfo = _a.sent();
                        ctx.result = mockInfo;
                        return [4 /*yield*/, next()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        // 调用mock
        this.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx.result = Mock.mock(ctx.result);
                        return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 验证数据准确性
     * @param instance   {ModelProxy.IInterfaceModel}  接口实例
     * @param options    {ModelProxy.IExecute}         执行的参数
     * @return           {Promise<any>}
     */
    MockEngine.prototype.proxy = function (instance, options) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, fn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = {
                            instance: instance,
                            executeInfo: options
                        }, fn = this.callback(function () {
                        });
                        return [4 /*yield*/, fn(ctx)];
                    case 1:
                        _a.sent();
                        if (ctx.isError) {
                            throw ctx.err;
                        }
                        return [2 /*return*/, ctx.result];
                }
            });
        });
    };
    return MockEngine;
}(modelproxy_1.modelProxy.BaseEngine));
exports.MockEngine = MockEngine;
//# sourceMappingURL=index.js.map