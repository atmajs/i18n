import config from '../Config'
import languages from '../Languages'
import { ILocalizer } from './ILocalizer';
import { lang_extend } from '../util/lang';
import { format } from '../global'

const _cache: { [key: string]: ILocalizer } = {};

export function localizer_create(isoCode: string): ILocalizer {

    return _cache[isoCode] == null
        ? (_cache[isoCode] = localizer(isoCode))
        : _cache[isoCode]
        ;
};

// private


function localizer(isoCode: string): ILocalizer {

    let translation = languages[isoCode];
    if (translation == null) {
        languages[isoCode] = {};
    }
    let defaultTranslation = languages['default'];
    if (defaultTranslation == null) {
        languages['default'] = {};
    }
    
    const fn: ILocalizer = <any> function (key: string, ...args: any[]) {

        let str = translation[key] || defaultTranslation[key];
        if (str == null) {
            console.warn('<localization> No translation for', key);
            str = key;
        }
        if (args.length === 0) {
            return str;
        }
        // format string
        return format(str, ...args);
    };

    // properties
    fn.lang = isoCode;    
    return fn;
}
