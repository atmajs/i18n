var languages = {},
	lang_SUPPORT = ['en']
	;
	
var lang_extend,
	lang_contains,
	lang_tryLoad
	;

(function(languages){
	lang_contains = function(isoCode) {
		return lang_SUPPORT.indexOf(isoCode) !== -1;
	};
	
	lang_extend = function(isoCode, translations){
		if (translations == null) 
			return;
		
		if (languages[isoCode] == null) {
			languages[isoCode] = translations;
			return;
		}
			
		obj_extend(languages[isoCode], translations);
	};
	
	
	// check include params
	lang_tryLoad = function(callback){
		
		var params = include && include.route && include.route.params;
		if (params == null) 
			return;
		
		if (params.support) 
			lang_SUPPORT = params.support.split(',');
		
		var path = params.path;
		if (path){ 
			if (is_Browser) {
				SourceFactory
					.loadSingle({ path: path })
					.done(callback);
				return;
			}
			
			SourceFactory
				.loadAll({ path: path })
				.done(callback);
			return;
		}
		
		callback && callback();
	};
	
}(languages));