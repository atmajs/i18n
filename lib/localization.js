(function(root, factory){
	"use strict";

	var _global, _exports;
	
	if (typeof exports !== 'undefined' && (root === exports || root == null)){
		// raw nodejs module
		_global = _exports = global;
	}
	
	if (_global == null) {
		_global = typeof window === 'undefined' ? global : window;
	}
	if (_exports == null) {
		_exports = root || _global;
	}
	
	
	factory(_global, _exports);
	
}(this, function(global, exports){
	"use strict";
	
	
	
	// source ../src/dependency.js
		
	var atma = global.atma || global;
	
	if (atma.mask == null) 
		atma = require('atma-libs/exports');
	
	
	var mask = atma.mask,
		include = atma.include
		;
	
	
	
	// end:source ../src/dependency.js
	// source ../src/vars.js
	
	var is_NODE = typeof document === 'undefined',
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
	
	
	// end:source ../src/vars.js
	
	// source ../src/util/rgx.js
	
	function rgx_find(str, rgx, groupNumber) {
		var match = rgx.exec(str);
	
		if (match && match[groupNumber])
			return match[groupNumber];
	
		return null;
	}
	// end:source ../src/util/rgx.js
	// source ../src/util/detect.js
	function detect_fromBrowser(){
		
		var lang = rgx_find(global.location.search, /language=(\w+)/, 1);
		
		
		if (lang == null)
			lang = rgx_find(global.navigator.language, /^(\w+)/, 1);
		
		lang = lang.toLowerCase();
	
		if (lang_SUPPORT.indexOf(lang) === -1)
			lang = lang_SUPPORT[0];
			
		return lang;
	}
	
	function detect_fromRequest(req){
		// en-US,en;q=0.8,ru;q=0.6,de;q=0.4
		var langs = req.getHeader('Accept-Language');
		
		if (!langs) 
			return lang_SUPPORT[0];
		
		langs = langs.replace(/\s*/g, '');
		
		var array = langs.split(','),
			lang;
		
		for (var i = 0, imax = array.length; i < imax; i++){
			
			lang = array[i].split(';')[0];
			
			if (lang_SUPPORT.indexOf(lang) !== -1) {
				
				return lang;
			}
		}
		
		return lang_SUPPORT[0];
	}
	// end:source ../src/util/detect.js
	
	// source ../src/format/format.js
	var format;
	
	(function(){
		
		// source parse.js
		var format_parse;
		
		(function(){
			
			
			var _cache = {};
			
			format_parse = function(str){
				if (_cache[str]) 
					return _cache[str];
				
				
				var index = 0,
					nextIndex,
					end,
					i = 0,
					parts = [];
				
				while(1){
					
					nextIndex = str.indexOf('{', index);
					
					if (nextIndex === -1) 
						break;
					
					
					if (nextIndex > 0 && str.charCodeAt(nextIndex - 1) === 92) {
						// \ - not escaped
						continue;
					}
					
					parts[i++] = str.substring(index, nextIndex);
					index = nextIndex;
					
					end = str.indexOf('}', nextIndex);
					if (end === -1) {
						console.error('<str:format> interpolation end quote not found', str);
						break;
					}
					
					parts[i++] = format_parseSingle(str.substring(index + 1, end));
					
					index = end + 1;
				}
				
				parts[i] = str.substring(index);
				
				return parts;
			};
			
			
			function format_parseSingle(str){
				var colon = str.indexOf(':'),
					index, spec;
				
				if (colon === -1) {
					index = parseInt(str, 10);
				} else{
					
					index = parseInt(str.substring(0, colon), 10);
					spec = str.substring(colon + 1);
				}
				
				if (isNaN(index)) {
					// if DEBUG
					console.error('<str:format> argument index could not be parsed', str);
					// endif
					return -1;
				}
				
				if (spec == null) 
					return index;
				
				
				return {
					index: index,
					spec: spec
				};
			}
			
			
		}());
		
		// end:source parse.js
		// source build.js
		
		/*
		 * args are all arguments passed to format function,
		 * so values index starts from 1
		 */
		
		function format_build(array, args) {
			
			var even = true,
				i = 0,
				imax = array.length,
				str = '',
				format
				;
				
			for(; i < imax; i++){
				
				if (even === true) {
					even = false;
					
					str += array[i];
					continue;
				}
				even = true;
				
				format = array[i];
				
				if (typeof format === 'number') {
					
					str += args[format + 1];
					continue;
				}
				
				
				
				str += format_type(args[format.index + 1], format.spec);
			}
			
			return str;
		}
		// end:source build.js
		// source type.js
		
		function format_type(value, spec){
			console.error('<str: format-type> not implemented yet');
			return '<not implemented yet>';
		}
		// end:source type.js
		
		format = function(str, args){
			
			
			var parsed = format_parse(str),
				__args = arguments;
			
			
			if (arguments.length > 2) {
				__args = arguments;
			} else if (args != null && typeof args !== 'object') {
				__args = arguments;
			}
			
			
			return format_build(parsed, __args);
		};
		
	}());
	// end:source ../src/format/format.js
	// source ../src/localizer/localizer.js
	var localizer_create = (function(Languages){
			
		var _cache = {};
		
		
		function localizer(lang){
			
			var translation = Languages[lang];
			if (translation == null) {
				console.error('<localization> Translation is not defined for', lang);
			}
			
			return function(key /* ... */){
				
				if (translation == null) 
					return key;
				
				var str = translation[key];
				if (str == null) {
					
					console.error('<localization> No translation for', key);
					return key;
				}
				
				
				return format(str, arguments);
			};
		}
		
		return function(lang) {
			
			return _cache[lang] == null 
				? (_cache[lang] = localizer(lang))
				: _cache[lang]
				;
		};
	}(Languages));
	
	// end:source ../src/localizer/localizer.js
	// source ../src/localizer/browser.js
	
	function BrowserLocalizer() {
		
		BrowserLocalizer = localizer_create(detect_fromBrowser());
		
		return BrowserLocalizer.apply(null, arguments);
	}
	// end:source ../src/localizer/browser.js
	// source ../src/localizer/node.js
	
	function NodeLocalizer(){
		
		console.error('<localizer> In node env. please call $L.fromReq(req)("someKey")');
		return localizer_create(lang_SUPPORT[0]);
	}
	
	NodeLocalizer.fromReq = function(req){
		var lang = req.lang || (req.lang = detect_fromRequest(req));
		
		return localizer_create(lang);
	};
	// end:source ../src/localizer/node.js
	
	// source ../src/loader.js
	
	
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
	// end:source ../src/loader.js
	// source ../src/L.js
	
	var $L = is_NODE
		? NodeLocalizer
		: BrowserLocalizer
		;
	
	mask.registerUtil('L', is_NODE
		? L_util_NODE
		: L_util_BROWSER
	);
	
	
	function L_util_NODE(key, model, ctx){
		
		return $L(ctx.req, key, model);
	}
	
	function L_util_BROWSER(key, model){
		
		return $L(key, model);
	}
	
	// end:source ../src/L.js
	
	
	
	loader_load();
	exports.$L = $L;
	
}));