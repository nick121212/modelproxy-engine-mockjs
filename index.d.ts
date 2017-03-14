declare module 'modelproxy' {
    export namespace ModelProxyEngine {
        class MockEngine extends BaseEngine {
            constructor();
            validate(intance: ModelProxy.IInterfaceModel, options: ModelProxy.IExecute): boolean;
            proxy(intance: ModelProxy.IInterfaceModel, options: ModelProxy.IExecute): Promise<any>;
        }
    }
}