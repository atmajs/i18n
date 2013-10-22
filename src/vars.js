
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

