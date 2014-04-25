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