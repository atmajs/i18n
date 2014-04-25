var Languages = {},
	lang_SUPPORT = ['en']
	//-lang_PATH = '/localization/%%.json'
	;
	
var lang_extend,
	lang_contains,
	lang_tryLoad
	;

(function(Languages){
	lang_contains = function(isoCode) {
		return lang_SUPPORT.indexOf(isoCode) !== -1;
	};
	
	lang_extend = function(isoCode, translations){
		
		if (Languages[isoCode] == null) 
			return Languages[isoCode] = translations;
			
		return obj_extend(Languages[isoCode], translations);
	};
	
	
	// check include params
	lang_tryLoad = function(callback){
		
		var params = include && include.route && include.route.params;
		if (params == null) 
			return;
		
		if (params.support) 
			lang_SUPPORT = params.support.split(',');
		
		var config = { supported: lang_SUPPORT }
		if (params.path || params.directory){ 
			config.path = params.path;
			config.directory = params.directory;
			
			SourceFactory.load(config, callback);
			return;
		}
		callback && callback();
	};
	
}(Languages));