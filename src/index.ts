import * as Mock from "mockjs";
import { modelProxy, ModelProxy } from 'modelproxy';
import * as _ from "lodash";
import * as serialize from "node-serialize";

export class MockEngine extends modelProxy.BaseEngine {
    mockEngine: ModelProxy.IEngine;

    constructor(mockEngine?: ModelProxy.IEngine) {
        super();
        this.mockEngine = mockEngine;
    }

    async proxy(instance: ModelProxy.IInterfaceModel, options: ModelProxy.IProxyCtx) {
        if (!this.mockEngine) {
            throw new modelProxy.errors.ModelProxyMissingError("没有设置mock的默认引擎！");
        }

        let mockInfo = await this.mockEngine.proxy(_.extend({}, instance, {
            path: `${instance.mockDir}`,
            method: "GET"
        }), _.extend({}, options, {
            settings: {
                dataType: "json"
            },
            params: {
                path: `${instance.ns}/${instance.key}`
            }
        }));

        return {
            options: options,
            instance: instance,
            mockData: Mock.mock(serialize.unserialize(serialize.unserialize(mockInfo)))
        };
    }
}