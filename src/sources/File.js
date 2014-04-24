/**
 *	Load translations
 *	: NodeJS - load all supported languages
 *	: Browser - load browser language only or default
 *
 *	@param path {String} e.g. '/localization/%%.json'
 *	@param supported {Array<String>} lang iso codes
 *	
 *	export lang(s) to `Languages`
 */
Sources['file'] = function(path, supported){
	
	
	return include
		.ajax(loader_getPaths())
		.done(function(resp) {
			
			for (var key in resp.ajax){
				Languages[key] = resp.ajax[key];
			}
		});
	
	
	function loader_getPaths(){
		if (is_NODE) {
			var paths = [];
			
			supported.forEach(function(lang, index){
				paths[index] = path.replace('%%', lang);
			});
			
			return paths;
		} 
			
		return [path.replace('%%', detect_fromBrowser())];
	}
};