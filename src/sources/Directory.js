/**
 * NodeJS: look for all translations: 'baz/*.json'
 * Browser: Not supported
 */
 
Sources['directory'] = function(path, callback){
	
	var io = global.io || (global.atma && atma.io),
		glob = io && io.glob;
		
	if (glob == null) {
		try {
			io = require('atma-io');
		}catch(error){
			log_error('run `npm i atma-io -save`');
			throw error;
		}
		glob = io.glob;
	}
	
	var langs = [];
	glob
		.readFiles(path)
		.forEach(function(file){
			
			var lang = file.uri.getName(),
				translations = file.read();
			
			if (typeof translations === 'string') {
				try {
					translations = JSON.parse(translations);
				}catch(error){
					log_error('Failed to load translations', file.uri.toLocalFile());
					return;
				}
			}
			
			lang_extend(lang, translations);
		});
	
	if (langs.length === 0) 
		log_error('No translations', path);
		
	callback();
}