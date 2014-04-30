(function(root, factory){
	"use strict";

	var _global, _exports;
	
	if (typeof exports !== 'undefined' && (root === exports || root == null)){
		// raw nodejs module
		_global = _exports = global;
	}
	
	if (_global == null) 
		_global = typeof window === 'undefined' ? global : window;
	
	if (_exports == null) 
		_exports = root || _global;
	
	
	factory(_global, _exports);
	
}(this, function(global, exports){
	"use strict";
	
	// source /src/vars.js
	
	var _Array_slice = Array.prototype.slice,
	
		is_NODE = typeof document === 'undefined'
		;
	
	
	// end:source /src/vars.js
	// source /src/dependency.js
		
	var atma = global.atma || global;
	
	if (atma.mask == null && is_NODE) 
		atma = require('atma-libs/exports');
	
	var mask = atma.mask,
		include = atma.include
		;
	
	
	// atma-formatter
	var __format = is_NODE
		? require('atma-formatter')
		: window.Formatter || (mask && mask.$utils.format)
		;
	if (__format == null) 
		throw Error('atma-formatter is not preloaded.');
	
	
	// end:source /src/dependency.js
	
	// source /src/util/obj.js
	
	var obj_getProperty,
		obj_setProperty,
		obj_extend
		;
	
	(function(){
		
		obj_getProperty = function(obj, property) {
			var chain = property.split('.'),
				imax = chain.length,
				i = -1;
			while ( ++i < imax ) {
				if (obj == null) 
					return null;
				
				obj = obj[chain[i]];
			}
			return obj;
		};
		
		
		obj_setProperty = function(obj, property, value) {
			var chain = property.split('.'),
				imax = chain.length,
				i = -1,
				key;
		
			while ( ++i <  imax - 1) {
				key = chain[i];
				
				if (obj[key] == null) 
					obj[key] = {};
				
				obj = obj[key];
			}
		
			obj[chain[i]] = value;
		};
		
		
		obj_extend = function(target, source) {
			if (target == null) 
				target = {};
			if (source == null) 
				return target;
			
			var val,
				key;
			for(key in source) {
				val = source[key];
				if (val != null) 
					target[key] = val;
			}
			return target;
		};
	}());
	// end:source /src/util/obj.js
	// source /src/util/rgx.js
	
	function rgx_find(str, rgx, groupNumber) {
		var match = rgx.exec(str);
	
		if (match && match[groupNumber])
			return match[groupNumber];
	
		return null;
	}
	// end:source /src/util/rgx.js
	// source /src/util/log.js
	var log_error;
	(function(){
		
		log_error = function(){
			var args = _Array_slice.call(arguments);
			args.unshift('<i18n>');
			console.log.apply(console, args);
		};
		
	}());
	// end:source /src/util/log.js
	// source /src/util/detect.js
	var detect_fromBrowser,
		detect_fromRequest
		;
		
	(function(){
	
		detect_fromBrowser = function(){
			
			var lang = fromSearch(global.location.search);
			if (lang == null)
				lang = rgx_find(global.navigator.language, /^(\w+)/, 1);
			
			lang = lang.toLowerCase();
			return lang_contains(lang)
				? lang
				: lang_SUPPORT[0];
		};
		
		detect_fromRequest = function(req){
			// en-US,en;q=0.8,ru;q=0.6,de;q=0.4
			var queryIndex = req.url.indexOf('?'),
				lang, langs;
			
			if (queryIndex !== -1) {
				var search = req.url.substring(req.url);
				
				lang = fromSearch(search);
				if (lang_contains(lang)) 
					return lang;
			}
			
			langs = req.getHeader('Accept-Language');
			if (!langs) 
				return lang_SUPPORT[0];
			
			langs = langs
				.replace(/\s*/g, '')
				.toLowerCase();
			
			var array = langs.split(','),
				imax = array.length,
				i = -1,
				index, x;
				
			while (++i < imax){
				x = array[i];
				index = x.indexOf(';');
				lang = index === -1
					? x
					: x.substring(0, index);
					
				if (lang_contains(lang)) 
					return lang;
			}
			
			return lang_SUPPORT[0];
		};
		
		// private
		
		function fromSearch(search){
			return rgx_find(search, /language=(\w+)/, 1);
		}
		
	}());
	
	// end:source /src/util/detect.js
	// source /src/util/lang.js
	var Languages = {},
		lang_SUPPORT = ['en']
		//-lang_PATH = '/localization/%%.json'
		;
		
	var lang_extend,
		lang_contains,
		lang_tryLoad
		;
	
	(function(Languages){
		lang_contains = function(isoCode) {
			return lang_SUPPORT.indexOf(isoCode) !== -1;
		};
		
		lang_extend = function(isoCode, translations){
			
			if (Languages[isoCode] == null) 
				return Languages[isoCode] = translations;
				
			return obj_extend(Languages[isoCode], translations);
		};
		
		
		// check include params
		lang_tryLoad = function(callback){
			
			var params = include && include.route && include.route.params;
			if (params == null) 
				return;
			
			if (params.support) 
				lang_SUPPORT = params.support.split(',');
			
			var config = { supported: lang_SUPPORT }
			if (params.path || params.directory){ 
				config.path = params.path;
				config.directory = params.directory;
				
				SourceFactory.load(config, callback);
				return;
			}
			callback && callback();
		};
		
	}(Languages));
	// end:source /src/util/lang.js
	// source /src/sources/exports.js
	var SourceFactory;
	
	(function(){
		var Sources = {};
		
		// source File.js
		/**
		 *	Load translations
		 *	: NodeJS - load all supported languages
		 *	: Browser - load browser language only or default
		 *
		 *	@param path {String} e.g. '/localization/%%.json'
		 *	
		 *	export lang(s) to `Languages`
		 */
		Sources['file'] = function(path, callback){
			
			
			if (include == null && is_NODE === false) {
				var lang = detect_fromBrowser(),
					url = path.replace('%%', lang);
				xhr(url, function(response){
					lang_extend(lang, response);
					callback();
				});
				
				return;
			}
			
			return include
				.ajax(getPaths())
				.done(function(resp) {
					
					for (var key in resp.ajax){
						lang_extend(key, resp.ajax[key]);
					}
					
					callback && callback();
				});
			
			
			function getPaths(){
				if (is_NODE) {
					var paths = [];
					
					lang_SUPPORT.forEach(function(lang, index){
						paths[index] = path.replace('%%', lang);
					});
					
					return paths;
				} 
					
				return [path.replace('%%', detect_fromBrowser())];
			}
			
			function xhr(path, callback){
				
				var req = new XMLHttpRequest();
				req.onload = function reqListener () {
					
					var json;
					try {
						json = JSON.parse(req.responseText);
					}
					catch(error){
						log_error('Should be json', error);
					}
					finally {
						callback(json);
					}
				}
				
				req.open("get", path, true);
				req.send();
			}
		};
		// end:source File.js
		// source Directory.js
		/**
		 * NodeJS: look for all translations: 'baz/*.json'
		 * Browser: Not supported
		 */
		 
		Sources['directory'] = function(path, callback){
			
			var io = global.io || (global.atma && atma.io),
				glob = io && io.glob;
				
			if (glob == null) {
				try {
					io = require('atma-io');
				}catch(error){
					log_error('run `npm i atma-io -save`');
					throw error;
				}
				glob = io.glob;
			}
			
			var langs = [];
			glob
				.readFiles(path)
				.forEach(function(file){
					
					var lang = file.uri.getName(),
						translations = file.read();
					
					if (typeof translations === 'string') {
						try {
							translations = JSON.parse(translations);
						}catch(error){
							log_error('Failed to load translations', file.uri.toLocalFile());
							return;
						}
					}
					
					lang_extend(lang, translations);
				});
			
			if (langs.length === 0) 
				log_error('No translations', path);
				
			callback();
		}
		// end:source Directory.js
		//- import Mongo.js
		
		SourceFactory = {
			/* { path|mongo, support } */
			load: function(config, callback){
				
				if (config.support) 
					lang_SUPPORT = config.support;
				
				if (config.path) {
					if (is_NODE === false || config.path.indexOf('%%') !== -1) 
						return Sources.file(config.path, callback);
				
					return Sources.directory(config.path, callback);
				}
				
				if (config.mongo) {
					throw Error('i18n Mongosource not implemented');
					return Sources.mongo(config.mongo);
				}
				
				console.error('Unknown source', config);
				return null;
			},
			
			loadSingle: function(req, config, callback){
				if (config.support) 
					lang_SUPPORT = config.support;
				
				var lang = detect_fromRequest(req);
				if (lang_contains(lang)) {
					callback($L.fromReq(req));
					return;
				}
				
				if (config.path) {
					this.load({
						path: config.path.replace('%%', lang)
					}, onComplete);
					
					return;
				}
				
				console.error('<Single Load: implemented `config.path` only>');
				
				function onComplete() {
					callback($L.fromReq(req));
				}
			}
		};
	}());
	// end:source /src/sources/exports.js
	
	// source /src/localizer/localizer.js
	var localizer_create;
	
	(function(Languages){
		
		localizer_create = function(lang) {
			
			return _cache[lang] == null 
				? (_cache[lang] = localizer(lang))
				: _cache[lang]
				;
		};
		
		// private
		
		var _cache = {};
		
		function localizer(lang){
			
			var translation = Languages[lang];
			if (translation == null) 
				console.error('<localization> Translation is not defined for', lang);
			
			var fn = function(key /* ... */){
				
				var str = translation == null
						? key
						: translation[key],
					args
					;
				
				if (str == null) {
					console.error('<localization> No translation for', key);
					str = key;
				}
				
				if (arguments.length === 1)
					return str;
				
				// format string
				args = _Array_slice.call(arguments);
				args[0] = str;
				return __format.apply(null, args);
			};
			
			// properties
			fn.lang = lang;
			
			return fn;
		}
	}(Languages));
	
	// end:source /src/localizer/localizer.js
	// source /src/localizer/browser.js
	
	function BrowserLocalizer() {
		
		BrowserLocalizer = localizer_create(detect_fromBrowser());
		
		return BrowserLocalizer.apply(null, arguments);
	}
	// end:source /src/localizer/browser.js
	// source /src/localizer/node.js
	
	function NodeLocalizer(){
		
		console.error('<localizer> In node env. please call $L.fromReq(req)("someKey")');
		return localizer_create(lang_SUPPORT[0]);
	}
	
	NodeLocalizer.fromReq = function(req){
		if (req.$L) 
			return req.$L;
		
		var lang = detect_fromRequest(req),
			localizer = localizer_create(lang)
			;
		return req.$L = localizer;
	};
	// end:source /src/localizer/node.js
	
	// source /src/L.js
	
	var $L = is_NODE
		? NodeLocalizer
		: BrowserLocalizer
		;
	
	if (mask != null) {
		// source L.util.js
		var L_util_NODE,
			L_util_BROWSER
			;
			
		(function(){
		
			L_util_NODE = function(){
				return $L.fromReq(ctx.req)(key, model);
			};
			
			L_util_BROWSER = function(){
				return localize($L, arguments);
			};
		
			// private
			var evalStatements__ = mask.Utils.Expression.evalStatements;
			
			function localize($L, args) {
				return $L.apply(null, parse_arguments(args));
			}
			
			function parse_arguments(args){
				var str = args[0].trim(),
					model = args[1],
					ctx = args[2],
					ctr = args[3]
					;
				
				switch (str.charCodeAt(0)) {
					case 34: // "
					case 39: // '
						return evalStatements__(str, model, ctx, ctr);
				}
				
				var comma = str.indexOf(',');
				if (comma === -1) 
					return [str];
				
				args = evalStatements__(str.substring(comma + 1), model, ctx, ctr);
				args.unshift(str.substring(0, comma));
				
				return args;
			}
			
		}());
		
		// end:source L.util.js
		
		mask.registerUtil('L', is_NODE
			? L_util_NODE
			: L_util_BROWSER
		);
	}
	
	
	$L.load = SourceFactory.load;
	$L.loadSingle = SourceFactory.loadSingle;
	// end:source /src/L.js
	
	
	
	lang_tryLoad();
	exports.$L = $L;
	
}));