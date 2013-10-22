

function loader_load(){
	
	 return include
		.ajax(loader_getPaths())
		.done(function(resp) {

		for (var key in resp.ajax){
			Languages[key] = resp.ajax[key];
		}
    });
		
}


function loader_getPaths(){
	
	
	if (is_NODE) {
		var paths = [];
		
		lang_SUPPORT.forEach(function(lang, index){
			
			paths[index] = include_PATH.replace('%%', lang);
		});
		
		return paths;
	} 
		
	return [include_PATH.replace('%%', detect_fromBrowser())];
}