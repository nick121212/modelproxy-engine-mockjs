import * as Mock from "mockjs";
import modelProxy, { ModelProxy } from 'modelproxy';

export class MockEngine implements ModelProxy.IEngine {
    MockObj: any;
    mockEngine: ModelProxy.IEngine;

    constructor(mockEngine?: ModelProxy.IEngine) {
        this.MockObj = Mock;
        this.mockEngine = mockEngine;
    }

    validate(data: any): boolean {
        return true;
    }

    async proxy(intance: ModelProxy.IInterfaceModel, data: any, params: any) {
        let path = `${intance.mockDir}/${intance.ns}/${intance.path}.js`.replace(/\/\//ig, "/");
        let mockInfo;

        if (!this.mockEngine) {
            throw new Error("没有设置mock的默认引擎！");
        }

        mockInfo = await this.mockEngine.proxy({
            path: path,
            key: "mock" + intance.key,
            method: modelProxy.methods.GET,
            title: ""
        }, null, null);

        return {
            req: {
                data: data,
                params: params
            },
            mockData: Mock.mock(mockInfo)
        };
    }
}