
// source ./UMD.js
(function(factory){
	
	var _name = '$L',
		_global = typeof window === 'undefined' ? global : window,
		_module = {
			exports: {}
		};

	factory(_module, _module.exports, _global);

	if (typeof define === 'function' && define.amd) {
        define([], function () {
        	return _module.exports;
        });
        return;
    } 
    if (typeof module === 'object' && module.exports) {
    	module.exports = _module.exports;
    	return;
    }

	if (_name) {
		_global[_name] = _module.exports;
	}

}(function(module, exports, global){
	var _src_Config = {};
var _src_L = {};
var _src_Languages = {};
var _src_global = {};
var _src_localizer_BrowserLocalizer = {};
var _src_localizer_Factory = {};
var _src_sources_File = {};
var _src_sources_SourceFactory = {};
var _src_util_Deferred = {};
var _src_util_detect = {};
var _src_util_lang = {};
var _src_util_log = {};
var _src_util_mask = {};
var _src_util_obj = {};
var _src_util_rgx = {};

// source ./ModuleSimplified.js
var _src_util_rgx;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rgx_find(str, rgx, groupNumber) {
    var match = rgx.exec(str);
    if (match && match[groupNumber])
        return match[groupNumber];
    return null;
}
exports.rgx_find = rgx_find;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_rgx) && isObject(module.exports)) {
		Object.assign(_src_util_rgx, module.exports);
		return;
	}
	_src_util_rgx = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_global;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isBrowser = !!(typeof window !== 'undefined' && window.document);
exports.isBrowser = isBrowser;
var isNode = !isBrowser;
exports.isNode = isNode;
var g = isBrowser ? window : global;
exports.global = g;
var include = g.include;
exports.include = include;
var mask = g.mask || (g.atma && g.atma.mask);
exports.mask = mask;
var format = g.Formatter;
exports.format = format;
if (format == null) {
    exports.format = format = mask && mask._.format;
}
if (format == null) {
    throw Error('atma-formatter is not preloaded.');
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_global) && isObject(module.exports)) {
		Object.assign(_src_global, module.exports);
		return;
	}
	_src_global = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Config;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
        this.support = ['en'];
    }
    Config.prototype.setLanguages = function (support) {
        this.support = support;
    };
    Config.prototype.contains = function (isoCode) {
        return this.support.indexOf(isoCode) !== -1;
    };
    return Config;
}());
exports.Config = Config;
;
exports.default = new Config;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Config) && isObject(module.exports)) {
		Object.assign(_src_Config, module.exports);
		return;
	}
	_src_Config = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_detect;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rgx_1 = _src_util_rgx;
var global_1 = _src_global;
var Config_1 = _src_Config;
function detect_fromBrowser() {
    var lang = fromSearch(global_1.global.location.search);
    if (lang == null)
        lang = rgx_1.rgx_find(global_1.global.navigator.language, /^(\w+)/, 1);
    lang = lang.toLowerCase();
    return Config_1.default.contains(lang)
        ? lang
        : Config_1.default.support[0];
}
exports.detect_fromBrowser = detect_fromBrowser;
;
function detect_fromRequest(req) {
    // en-US,en;q=0.8,ru;q=0.6,de;q=0.4
    var queryIndex = req.url.indexOf('?'), lang;
    if (req.url.indexOf('?') !== -1) {
        lang = fromSearch(req.url);
        if (Config_1.default.contains(lang))
            return lang;
    }
    var langs = req.headers['accept-language'];
    if (langs == null)
        return Config_1.default.support[0];
    langs = langs
        .replace(/\s*/g, '')
        .toLowerCase();
    var array = langs.split(','), imax = array.length, i = -1, index, x;
    while (++i < imax) {
        x = array[i];
        index = x.indexOf(';');
        lang = index === -1
            ? x
            : x.substring(0, index);
        if (Config_1.default.contains(lang))
            return lang;
    }
    return Config_1.default.support[0];
}
exports.detect_fromRequest = detect_fromRequest;
;
// private
function fromSearch(search) {
    return rgx_1.rgx_find(search, /language=(\w+)/, 1);
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_detect) && isObject(module.exports)) {
		Object.assign(_src_util_detect, module.exports);
		return;
	}
	_src_util_detect = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Languages;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Language = /** @class */ (function () {
    function Language() {
    }
    return Language;
}());
exports.Language = Language;
var Translations = /** @class */ (function () {
    function Translations() {
    }
    return Translations;
}());
exports.Translations = Translations;
var Languages = /** @class */ (function () {
    function Languages() {
    }
    return Languages;
}());
exports.Languages = Languages;
exports.default = {};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Languages) && isObject(module.exports)) {
		Object.assign(_src_Languages, module.exports);
		return;
	}
	_src_Languages = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_obj;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function obj_getProperty(obj, property) {
    var chain = property.split('.'), imax = chain.length, i = -1;
    while (++i < imax) {
        if (obj == null)
            return null;
        obj = obj[chain[i]];
    }
    return obj;
}
exports.obj_getProperty = obj_getProperty;
;
function obj_setProperty(obj, property, value) {
    var chain = property.split('.'), imax = chain.length, i = -1, key;
    while (++i < imax - 1) {
        key = chain[i];
        if (obj[key] == null)
            obj[key] = {};
        obj = obj[key];
    }
    obj[chain[i]] = value;
}
exports.obj_setProperty = obj_setProperty;
;
function obj_extend(target, source) {
    if (target == null)
        target = {};
    if (source == null)
        return target;
    var val, key;
    for (key in source) {
        val = source[key];
        if (val != null)
            target[key] = val;
    }
    return target;
}
exports.obj_extend = obj_extend;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_obj) && isObject(module.exports)) {
		Object.assign(_src_util_obj, module.exports);
		return;
	}
	_src_util_obj = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_log;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function log_error() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args.unshift('<i18n>');
    console.log.apply(console, args);
}
exports.log_error = log_error;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_log) && isObject(module.exports)) {
		Object.assign(_src_util_log, module.exports);
		return;
	}
	_src_util_log = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_Deferred;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Deferred = /** @class */ (function () {
    function Deferred() {
        this._isAsync = true;
        this._done = null;
        this._fail = null;
        this._always = null;
        this._resolved = null;
        this._rejected = null;
    }
    Deferred.prototype.defer = function () {
        this._rejected = null;
        this._resolved = null;
    };
    Deferred.prototype.resolve = function () {
        var done = this._done, always = this._always;
        this._resolved = arguments;
        dfr_clearListeners(this);
        arr_callOnce(done, this, arguments);
        arr_callOnce(always, this, [this]);
        return this;
    };
    Deferred.prototype.reject = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var fail = this._fail, always = this._always;
        this._rejected = args;
        dfr_clearListeners(this);
        arr_callOnce(fail, this, args);
        arr_callOnce(always, this, [this]);
        return this;
    };
    Deferred.prototype.resolveDelegate = function () {
        return fn_proxy(this.resolve, this);
    };
    Deferred.prototype.rejectDelegate = function () {
        return fn_proxy(this.reject, this);
    };
    Deferred.prototype.then = function (onSuccess, onError) {
        return this.done(onSuccess).fail(onError);
    };
    Deferred.prototype.done = function (callback) {
        return dfr_bind(this, this._resolved, this._done || (this._done = []), callback);
    };
    Deferred.prototype.fail = function (callback) {
        return dfr_bind(this, this._rejected, this._fail || (this._fail = []), callback);
    };
    Deferred.prototype.always = function (callback) {
        return dfr_bind(this, this._rejected || this._resolved, this._always || (this._always = []), callback);
    };
    return Deferred;
}());
exports.Deferred = Deferred;
;
// PRIVATE
function dfr_bind(dfr, arguments_, listeners, callback) {
    if (callback == null)
        return dfr;
    if (arguments_ != null)
        callback.apply(dfr, arguments_);
    else
        listeners.push(callback);
    return dfr;
}
function dfr_clearListeners(dfr) {
    dfr._done = null;
    dfr._fail = null;
    dfr._always = null;
}
function arr_callOnce(arr, ctx, args) {
    if (arr == null)
        return;
    var imax = arr.length, i = -1, fn;
    while (++i < imax) {
        fn = arr[i];
        if (fn)
            fn.apply(ctx, args);
    }
    arr.length = 0;
}
function fn_proxy(fn, ctx) {
    return function () {
        return fn.apply(ctx, arguments);
    };
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_Deferred) && isObject(module.exports)) {
		Object.assign(_src_util_Deferred, module.exports);
		return;
	}
	_src_util_Deferred = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_sources_File;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = _src_global;
var lang_1 = _src_util_lang;
var log_1 = _src_util_log;
/**
 *	Load translations
 *	: NodeJS - load all supported languages
 *	: Browser - load browser language only or default
 *
 *	@param path {String} e.g. '/localization/%%.json'
 *
 *	export lang(s) to `Languages`
 */
exports.SourceFile = {
    single: function (isoCode, path, callback) {
        loadTranslation(path, function (data) {
            lang_1.lang_extend(isoCode, data);
            callback();
        });
    },
    /**
     * - patter: e.g. '/localization/%%.json'
     */
    many: function (pattern, langs, callback) {
        var count = langs.length, max = count, i = -1;
        while (++i < max) {
            this.single(langs[i], pattern.replace('%%', langs[i]), onComplete);
        }
        function onComplete() {
            if (--count < 0)
                callback();
        }
    }
};
function loadTranslation(url, callback) {
    if (global_1.include == null && global_1.isBrowser) {
        xhr(url, function (response) {
            callback(response);
        });
        return;
    }
    var resource = global_1.isNode
        ? global_1.include.instance()
        : global_1.include;
    resource
        .ajax(url + '::Data')
        .done(function (resp) {
        callback(resp.ajax.Data);
    });
}
function xhr(path, callback) {
    var req = new XMLHttpRequest();
    req.onload = function reqListener() {
        var json;
        try {
            json = JSON.parse(req.responseText);
        }
        catch (error) {
            log_1.log_error('Should be json', error);
        }
        finally {
            callback(json);
        }
    };
    req.open("get", path, true);
    req.send();
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_sources_File) && isObject(module.exports)) {
		Object.assign(_src_sources_File, module.exports);
		return;
	}
	_src_sources_File = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_sources_SourceFactory;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = _src_Config;
var global_1 = _src_global;
var detect_1 = _src_util_detect;
var log_1 = _src_util_log;
var Deferred_1 = _src_util_Deferred;
var File_1 = _src_sources_File;
exports.SourceFactory = {
    loadAll: function (config) {
        if (config.support) {
            Config_1.default.setLanguages(config.support);
        }
        var count = Config_1.default.support.length, imax = count, i = -1;
        while (++i < imax) {
            config.lang = Config_1.default.support[i];
            this
                .loadSingle(config)
                .done(onComplete);
        }
        var dfr = new Deferred_1.Deferred;
        function onComplete() {
            if (--count < 0)
                dfr.resolve();
        }
        return dfr;
    },
    /*
     * @param config:
     * 		{ path<Url||%%-Pattern>, ?support<Array>, ?lang }
     * @param mix:
     *  - NodeJS: req
     *  - Browser: null
     *
     * @returns Deferred
     */
    loadSingle: function (config, req) {
        if (config.support) {
            Config_1.default.setLanguages(config.support);
        }
        var lang = config.lang, path = config.path;
        if (lang == null) {
            lang = global_1.isNode
                ? detect_1.detect_fromRequest(req)
                : detect_1.detect_fromBrowser();
        }
        if (path) {
            if (path.indexOf('%%'))
                path = path.replace('%%', lang);
            if (sources__[path])
                return sources__[path];
            var dfr = sources__[path] = new Deferred_1.Deferred;
            File_1.SourceFile.single(lang, path, dfr.resolveDelegate());
            return dfr;
        }
        log_1.log_error('<Single Load: implemented `config.path` only>');
    }
};
var Sources = {};
var sources__ = {};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_sources_SourceFactory) && isObject(module.exports)) {
		Object.assign(_src_sources_SourceFactory, module.exports);
		return;
	}
	_src_sources_SourceFactory = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_lang;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = _src_Config;
var Languages_1 = _src_Languages;
var obj_1 = _src_util_obj;
var global_1 = _src_global;
var SourceFactory_1 = _src_sources_SourceFactory;
function lang_contains(isoCode) {
    return Config_1.default.contains(isoCode);
}
exports.lang_contains = lang_contains;
;
function lang_extend(mix, translations) {
    if (typeof mix === 'string') {
        var isoCode = mix;
        if (Languages_1.default[isoCode] == null) {
            Languages_1.default[isoCode] = translations;
            return;
        }
        obj_1.obj_extend(Languages_1.default[isoCode], translations);
        return this;
    }
    var lang = typeof this.lang === 'string' && this.lang.length > 0
        ? this.lang
        : 'default';
    lang_extend(lang, mix);
    return this;
}
exports.lang_extend = lang_extend;
;
// check include params
function lang_tryLoad(callback) {
    //#if (BROWSER)
    var src;
    if (typeof global_1.include !== 'undefined' && global_1.include.route) {
        src = global_1.include.route.path;
    }
    else {
        var scripts = document.getElementsByTagName('script');
        var last = scripts[scripts.length - 1];
        src = last && last.src;
    }
    if (src == null) {
        return;
    }
    var i = src.indexOf('?');
    if (i === -1) {
        return;
    }
    var search = src.substring(i + 1);
    var params = {};
    var paars = search.split('&');
    for (var i_1 = 0; i_1 < paars.length; i_1++) {
        var keyValue = paars[i_1].split('=');
        params[keyValue[0]] = keyValue[1];
    }
    if (params.support)
        Config_1.default.setLanguages(params.support.split(','));
    var path = params.path;
    if (path) {
        if (global_1.isBrowser) {
            SourceFactory_1.SourceFactory
                .loadSingle({ path: path })
                .done(callback);
            return;
        }
        SourceFactory_1.SourceFactory
            .loadAll({ path: path })
            .done(callback);
        return;
    }
    //#endif
    callback && callback();
}
exports.lang_tryLoad = lang_tryLoad;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_lang) && isObject(module.exports)) {
		Object.assign(_src_util_lang, module.exports);
		return;
	}
	_src_util_lang = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_localizer_Factory;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Languages_1 = _src_Languages;
var lang_1 = _src_util_lang;
var global_1 = _src_global;
var obj_1 = _src_util_obj;
var _cache = {};
function localizer_create(isoCode) {
    return _cache[isoCode] == null
        ? (_cache[isoCode] = localizer(isoCode))
        : _cache[isoCode];
}
exports.localizer_create = localizer_create;
;
// private
function localizer(isoCode) {
    var translation = Languages_1.default[isoCode];
    if (translation == null) {
        translation = Languages_1.default[isoCode] = Object.create(null);
    }
    var defaultTranslation = Languages_1.default['default'];
    if (defaultTranslation == null) {
        defaultTranslation = Languages_1.default['default'] = Object.create(null);
    }
    var fn = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var str = translation[key] || defaultTranslation[key];
        if (str == null && key.indexOf('.') > -1) {
            str = obj_1.obj_getProperty(translation, key) || obj_1.obj_getProperty(defaultTranslation, key);
        }
        if (str == null) {
            console.warn('<localization> No translation for', key);
            str = key;
        }
        if (args.length === 0) {
            return str;
        }
        // format string
        return global_1.format.apply(void 0, [str].concat(args));
    };
    // properties
    fn.lang = isoCode;
    fn.extend = lang_1.lang_extend;
    return fn;
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_localizer_Factory) && isObject(module.exports)) {
		Object.assign(_src_localizer_Factory, module.exports);
		return;
	}
	_src_localizer_Factory = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_localizer_BrowserLocalizer;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var detect_1 = _src_util_detect;
var Factory_1 = _src_localizer_Factory;
var Config_1 = _src_Config;
var SourceFactory_1 = _src_sources_SourceFactory;
var lang_1 = _src_util_lang;
var localizer;
exports.BrowserLocalizer = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (localizer == null) {
        Utils.create(detect_1.detect_fromBrowser());
    }
    return localizer.apply(void 0, args);
};
exports.BrowserLocalizer.loadSingle = SourceFactory_1.SourceFactory.loadSingle;
exports.BrowserLocalizer.lang = 'default';
exports.BrowserLocalizer.extend = lang_1.lang_extend;
exports.BrowserLocalizer.config = function (opts) {
    if (opts.lang) {
        Utils.create(opts.lang);
    }
    if (opts.support) {
        Config_1.default.setLanguages(opts.support);
    }
    return this;
};
var Utils;
(function (Utils) {
    function create(lang) {
        localizer = Factory_1.localizer_create(lang);
        exports.BrowserLocalizer.lang = localizer.lang;
        exports.BrowserLocalizer.extend = localizer.extend;
        Config_1.default.lang = lang;
    }
    Utils.create = create;
})(Utils || (Utils = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_localizer_BrowserLocalizer) && isObject(module.exports)) {
		Object.assign(_src_localizer_BrowserLocalizer, module.exports);
		return;
	}
	_src_localizer_BrowserLocalizer = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_L;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserLocalizer_1 = _src_localizer_BrowserLocalizer;
exports.default = BrowserLocalizer_1.BrowserLocalizer;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_L) && isObject(module.exports)) {
		Object.assign(_src_L, module.exports);
		return;
	}
	_src_L = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_mask;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var L_1 = _src_L;
var global_1 = _src_global;
exports.mask_util = function (key, model, ctx) {
    return localize(L_1.default, arguments);
};
// private
var evalStatements__ = global_1.mask && global_1.mask.Utils.Expression.evalStatements;
function localize($L, args) {
    return $L.apply(null, parse_arguments(args));
}
function parse_arguments(args) {
    var str = args[0].trim(), model = args[1], ctx = args[2], ctr = args[4];
    switch (str.charCodeAt(0)) {
        case 40: // (
        case 34: // "
        case 39:// '
            return evalStatements__(str, model, ctx, ctr);
    }
    var comma = str.indexOf(',');
    if (comma === -1)
        return [str];
    args = evalStatements__(str.substring(comma + 1), model, ctx, ctr);
    args.unshift(str.substring(0, comma));
    return args;
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_mask) && isObject(module.exports)) {
		Object.assign(_src_util_mask, module.exports);
		return;
	}
	_src_util_mask = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
var L_1 = _src_L;
var global_1 = _src_global;
var mask_1 = _src_util_mask;
var lang_1 = _src_util_lang;
if (global_1.mask != null) {
    global_1.mask.registerUtil('L', mask_1.mask_util);
}
lang_1.lang_tryLoad();
module.exports = L_1.default;

}));
// end:source ./UMD.js
