import { ModelProxy, modelProxy } from 'modelproxy';

declare module 'modelproxy-engine-mockjs' {
    export namespace ModelProxyEngine {
         class MockEngine implements ModelProxy.IEngine {
            constructor(mockEngine?: ModelProxy.IEngine);
            validate(intance: ModelProxy.IInterfaceModel, options: ModelProxy.IExecute): boolean;
            proxy(intance: ModelProxy.IInterfaceModel, options: ModelProxy.IExecute): Promise<any>;
        }
    }

    export var MockEngine: typeof ModelProxyEngine.MockEngine;
}