var localizer_create;

(function(languages){
	
	localizer_create = function(lang) {
		
		return _cache[lang] == null 
			? (_cache[lang] = localizer(lang))
			: _cache[lang]
			;
	};
	
	// private
	
	var _cache = {};
	
	function localizer(lang){
		
		var translation = languages[lang];
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
}(languages));
