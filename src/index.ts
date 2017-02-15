import * as Mock from "mockjs";
import { modelProxy, ModelProxy } from 'modelproxy';
import * as _ from "lodash";

export class MockEngine extends modelProxy.BaseEngine {
    mockEngine: ModelProxy.IEngine;

    constructor(mockEngine?: ModelProxy.IEngine) {
        super();
        this.mockEngine = mockEngine;

        this.init();
    }

    validate(instance: ModelProxy.IInterfaceModel, options: ModelProxy.IExecute): boolean {
        if (!this.mockEngine) {
            throw new modelProxy.errors.ModelProxyMissingError("没有设置mock的默认引擎！");
        }

        super.validate(instance, options);

        return true;
    }

    init(): void {
        this.use(async (ctx: ModelProxy.IProxyCtx, next) => {
            let mockInfo = await this.mockEngine.proxy(_.extend({}, ctx.instance, {
                path: `${ctx.instance.mockDir}`,
                method: "GET"
            }), _.extend({}, ctx.executeInfo, {
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
    }

    async proxy(instance: ModelProxy.IInterfaceModel, options: ModelProxy.IProxyCtx) {
        let ctx: ModelProxy.IProxyCtx = {
            instance: instance,
            executeInfo: options
        }, fn = this.callback(() => {
            console.log("over");
        });

        await fn(ctx);

        return Mock.mock(ctx.result);
    }
}