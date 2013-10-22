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