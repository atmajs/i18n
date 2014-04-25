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
		}
	};
}());