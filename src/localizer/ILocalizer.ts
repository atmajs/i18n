import { Translations } from '../Languages'

import config, { IOptions } from '../Config'

export interface ILocalizer {
    (...args: any[]): string

    extend (translations: Translations): this
    config (opts: IOptions): this

    lang: string

    loadSingle (config: {path: string, support?: string[], lang?: string}, req?: Request)

    //#if (NODE)
    fromReq (req: Request): ILocalizer
    middleware (config: { path: string }): Function
    //#endif
}