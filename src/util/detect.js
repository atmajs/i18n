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
		
		langs = req.headers['Accept-Language'];
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
