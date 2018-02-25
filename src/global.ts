const isBrowser = !!(typeof window !== 'undefined' && window.document);
const isNode = !isBrowser
const g:any = isBrowser ? window : global;
let include = g.include;
let mask = g.mask || (g.atma && g.atma.mask);
let format = g.Formatter;

	
//#if (NODE)
if (include == null) {
    require('includejs');
    include = g.include;
}
if (mask == null) {
    mask = require('maskjs');
}
//#endif

if (format == null) {
    format = mask && mask._.format;
    //#if (NODE)
    if (format == null) {
        format = require('atma-formatter');
    }
    //#endif
}

if (format == null) {
    throw Error('atma-formatter is not preloaded.');
}

export {
    isBrowser,
    isNode,
    include,
    mask,
    format,
    g as global,
};