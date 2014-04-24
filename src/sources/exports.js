var SourceFactory;

(function(){
	var Sources = {};
	
	// import File.js
	// import Directory.js
	// import Mongo.js
	
	SourceFactory = {
		load: function(config){
			if (is_NODE === false || config.path.indexOf('%%') !== -1) 
				return Sources.file(config.path, config.supported);
			
			if (config.path) 
				return Sources.directory(config.path, config.supported);
			
			if (config.mongo) 
				return Sources.mongo(config.mongo);
			
			console.error('Unknown source', config);
			return null;
		}
	};
}());