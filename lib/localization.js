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
	
	
	// source /src/dependency.js
		
	var atma = global.atma || global;
	
	if (atma.mask == null) 
		atma = require('atma-libs/exports');
	
	var mask = atma.mask,
		include = atma.include
		;
	
	
	// atma-formatter
	var __format = isBrowser
		? window.Formatter || (mask && mask.$utils.format)
		: require('atma-formatter')
		;
	if (__format == null) 
		throw Error('atma-formatter is not preloaded.');
	
	
	// end:source /src/dependency.js
	// source /src/vars.js
	
	var _Array_slice = Array.prototype.slice,
	
		is_NODE = typeof document === 'undefined',
		lang_SUPPORT = ['en'],
		include_PATH = '/localization/%%.json'
		;
	
	var Languages = {},
		params = include.route.params;
	
	if (params){
		
		if (params.path) 
			include_PATH = params.path;
		
		if (params.support) 
			lang_SUPPORT = params.support.split(',');
	}
	
	
	// end:source /src/vars.js
	
	// source /src/util/rgx.js
	
	function rgx_find(str, rgx, groupNumber) {
		var match = rgx.exec(str);
	
		if (match && match[groupNumber])
			return match[groupNumber];
	
		return null;
	}
	// end:source /src/util/rgx.js
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
			return has(lang)
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
				if (has(lang)) 
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
					
				if (has(lang)) 
					return lang;
			}
			
			return lang_SUPPORT[0];
		};
		
		// private
		function has(lang){
			return lang_SUPPORT.indexOf(lang) !== -1;
		}
		
		function fromSearch(search){
			return rgx_find(search, /language=(\w+)/, 1);
		}
		
	}());
	
	// end:source /src/util/detect.js
	
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
			
			return function(key /* ... */){
				
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
		if (req.localizer) 
			return req.localizer;
		
		var lang = detect_fromRequest(req),
			localizer = localizer_create(lang)
			;
		return req.localizer = localizer;
	};
	// end:source /src/localizer/node.js
	
	// source /src/loader.js
	
	
	function loader_load(){
		
		 return include
			.ajax(loader_getPaths())
			.done(function(resp) {
	
			for (var key in resp.ajax){
				Languages[key] = resp.ajax[key];
			}
	    });
			
	}
	
	
	function loader_getPaths(){
		
		
		if (is_NODE) {
			var paths = [];
			
			lang_SUPPORT.forEach(function(lang, index){
				
				paths[index] = include_PATH.replace('%%', lang);
			});
			
			return paths;
		} 
			
		return [include_PATH.replace('%%', detect_fromBrowser())];
	}
	// end:source /src/loader.js
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
				var str = args[0],
					model = args[1],
					ctx = args[2],
					ctr = args[3]
					;
				
				switch (str.charCodeAt(0)) {
					case 34: // "
					case 39: // '
						return evalStatements_(str, model, ctx, ctr);
				}
				
				var comma = str.indexOf(',');
				if (comma === -1) 
					return str;
				
				args = evalStatements_(str.substring(comma + 1), model, ctx, ctr);
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
	
	// end:source /src/L.js
	
	
	
	loader_load();
	exports.$L = $L;
	
}));