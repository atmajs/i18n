var SourceFactory;

(function(){
	var Sources = {};
	
	// import File.js
	// import Directory.js
	//- import Mongo.js
	
	var sources__ = {};
	
	SourceFactory = {
		
		loadAll: function(config){
			if (config.support) 
				lang_SUPPORT = config.support;
			
			var count = lang_SUPPORT.length,
				imax = count,
				i = -1;
			
			while( ++i < imax){
				
				config.lang = lang_SUPPORT[i];
				logger.log(config);
				this
					.loadSingle(config)
					.done(onComplete)
			}
			
			var dfr = new Deferred;
			function onComplete(){
				--count < 0 && dfr.resolve();
			}
			
			return dfr;
		},
		
		/*
		 * @param config:
		 * 		{ path<Url||%%-Pattern>, ?support<Array>, ?lang }
		 * @param mix:
		 *  - NodeJS: req
		 *  - Browser: null
		 *
		 * @returns Deferred
		 */
		loadSingle: function(config, mix){
			if (config.support) 
				lang_SUPPORT = config.support;
			
			var lang = config.lang,
				path = config.path;
			
			if (lang == null) {
				lang = is_Node
					? detect_fromRequest(mix)
					: detect_fromBrowser()
					;
			}
			
			if (path) {
				if (path.indexOf('%%')) 
					path = path.replace('%%', lang);
				
				if (sources__[path]) 
					return sources__[path];
				
				var dfr = sources__[path] = new Deferred;
				
				Sources.file.single(lang, path, dfr.resolveDelegate());
				return dfr;
			}
			
			log_error('<Single Load: implemented `config.path` only>');
		}
	};
}());