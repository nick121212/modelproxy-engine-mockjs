import * as Mock from "mockjs";
import { modelProxy, ModelProxy } from 'modelproxy';

export class MockEngine extends modelProxy.BaseEngine implements ModelProxy.IEngine {
    mockEngine: ModelProxy.IEngine;

    constructor(mockEngine?: ModelProxy.IEngine) {
        super();
        this.mockEngine = mockEngine;
    }

    validate(data: any): boolean {
        return true;
    }

    async proxy(instance: ModelProxy.IInterfaceModel, options: ModelProxy.IProxyCtx) {
        if (!this.mockEngine) {
            throw new Error("没有设置mock的默认引擎！");
        }
        let mockInfo = await this.mockEngine.proxy(instance, options);

        return {
            req: {
                data: options.data,
                params: options.params
            },
            mockData: Mock.mock(mockInfo)
        };
    }
}