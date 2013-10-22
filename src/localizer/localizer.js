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
