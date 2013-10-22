

(function(global) {
	
	var lang_SUPPORT = ['en'],
		include_PATH = '/localization/%1.json',
		is_NODE = include.isNode
		;
		
	var Languages = {},
		paths = [],
		
		_lang;
		
	
	
	if (is_NODE) {
		
		lang_SUPPORT.forEach(function(lang, index){
			
			paths[index] = include_PATH.replace('%1', lang);
		});
	} else {
		
		_lang = detect_fromBrowser();
		
		paths[0] = include_PATH.replace('%1', _lang);
	}
	
	global.$L = is_NODE
		? NodeLocalizer
		: createLocalizer(_lang);
	
	
    include
		.ajax(paths)
		.done(function(resp) {

		for (var key in resp.load){
			Language[key] = resp.load[key];
		}
		
        
        mask.registerUtil('L', function(key, model, ctx) {
			
			var localizer = is_NODE && ctx
				? $L.fromReq(ctx.req)
				: $L
				;
			
			
            return localizer(key);
        });
    });


	function NodeLocalizer(){
		console.error('<localizer> In node env. please call $L.fromReq(req)("someKey")');
		return createLocalizer(lang_SUPPORT[0]);
	}
	NodeLocalizer.fromReq = function(req){
		var lang = req.lang || (req.lang = detect_fromRequest(req));
		
		return createLocalizer(lang);
	};
	
	
	var createLocalizer = (function(){
		
		var _cache = {};
		
		return function(lang) {
			
			return _cache[lang] || (_cache[lang] = function(key /* ... */){
				var translation = Languages[lang];
				if (translation == null) {
					console.error('<localization> Translation is not defined for', lang);
					return key;
				}
				
				var str = translation[key];
				if (!str) {
					console.error('<localization> No translation for', key);
					
					return key;
				}
				
				return str;
			});
		};
	}());
	
	function detect_fromBrowser(){
		var lang;
		
		lang = rgx_find(global.location.search, /language=(\w+)/, 1);
		
		
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

    function rgx_find(str, rgx, groupNumber) {
        var match = rgx.exec(str);

        if (match && match[groupNumber])
            return match[groupNumber];

        return null;
    }

}(typeof window !== 'undefined' ? window : global));

