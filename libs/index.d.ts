import { modelProxy, IInterfaceModel, IExecute, IEngine, IProxyCtx } from 'modelproxy';
export declare class MockEngine extends modelProxy.BaseEngine {
    private mockEngine;
    /**
     * 构造
     * @param mockEngine   {ModelProxy.IEngine}  用于获取mock数据的engine
     */
    constructor(mockEngine?: IEngine);
    /**
     * 验证数据准确性
     * @param instance   {ModelProxy.IInterfaceModel}  接口实例
     * @param options    {ModelProxy.IExecute}         执行的参数
     * @return           {boolean}
     */
    validate(instance: IInterfaceModel, options: IExecute): boolean;
    /**
     * 初始化中间件函数
     */
    private init();
    /**
     * 验证数据准确性
     * @param instance   {ModelProxy.IInterfaceModel}  接口实例
     * @param options    {ModelProxy.IExecute}         执行的参数
     * @return           {Promise<any>}
     */
    proxy(instance: IInterfaceModel, options: IProxyCtx): Promise<any>;
}
