var SourceFactory;

(function(){
	var Sources = {};
	
	// import File.js
	// import Directory.js
	//- import Mongo.js
	
	SourceFactory = {
		/* { path|mongo, support } */
		load: function(config, callback){
			
			if (config.support) 
				lang_SUPPORT = config.support;
			
			if (config.path) {
				if (is_NODE === false || config.path.indexOf('%%') !== -1) 
					return Sources.file(config.path, callback);
			
				return Sources.directory(config.path, callback);
			}
			
			if (config.mongo) {
				throw Error('i18n Mongosource not implemented');
				return Sources.mongo(config.mongo);
			}
			
			console.error('Unknown source', config);
			return null;
		},
		
		loadSingle: function(req, config, callback){
			if (config.support) 
				lang_SUPPORT = config.support;
			
			var lang = detect_fromRequest(req);
			if (lang_contains(lang)) {
				callback($L.fromReq(req));
				return;
			}
			
			if (config.path) {
				this.load({
					path: config.path.replace('%%', lang)
				}, onComplete);
				
				return;
			}
			
			console.error('<Single Load: implemented `config.path` only>');
			
			function onComplete() {
				callback($L.fromReq(req));
			}
		}
	};
}());