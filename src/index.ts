
import * as Mock from "mockjs";
import { modelProxy, IInterfaceModel, IExecute, IEngine, IProxyCtx } from 'modelproxy';
// import { IProxyCtx } from "../../modelproxy/libs/models/proxy.ctx";

export class MockEngine extends modelProxy.BaseEngine {
    private mockEngine: IEngine;

    /**
     * 构造
     * @param mockEngine   {ModelProxy.IEngine}  用于获取mock数据的engine
     */
    constructor(mockEngine?: IEngine) {
        super();
        this.mockEngine = mockEngine;
        this.init();
    }

    /**
     * 验证数据准确性
     * @param instance   {ModelProxy.IInterfaceModel}  接口实例
     * @param options    {ModelProxy.IExecute}         执行的参数
     * @return           {boolean}
     */
    validate(instance: IInterfaceModel, options: IExecute): boolean {
        if (!this.mockEngine) {
            throw new modelProxy.errors.ModelProxyMissingError("没有设置mock的默认引擎！");
        }

        super.validate(instance, options);

        return true;
    }

    /**
     * 初始化中间件函数
     */
    private init(): void {
        // 调用engine来请求数据
        this.use(async (ctx: IProxyCtx, next) => {
            let mockInfo = await this.mockEngine.proxy(Object.assign({}, ctx.instance, {
                path: `${ctx.instance.mockDir}`,
                method: "GET"
            }), Object.assign({}, ctx.executeInfo, {
                settings: {
                    dataType: "text"
                },
                params: {
                    path: `${ctx.instance.ns}/${ctx.instance.key}`
                }
            }));

            ctx.result = mockInfo;

            await next();
        });

        // 调用mock
        this.use(async (ctx: IProxyCtx, next) => {
            ctx.result = Mock.mock(ctx.result);

            await next();
        });

    }

    /**
     * 验证数据准确性
     * @param instance   {ModelProxy.IInterfaceModel}  接口实例
     * @param options    {ModelProxy.IExecute}         执行的参数
     * @return           {Promise<any>}
     */
    async proxy(instance: IInterfaceModel, options: IProxyCtx): Promise<any> {
        let ctx: IProxyCtx = {
            instance: instance,
            executeInfo: options
        }, fn = this.callback(() => {

        });

        await fn(ctx);

        if (ctx.isError) {
            throw ctx.err;
        }

        return ctx.result;
    }
}