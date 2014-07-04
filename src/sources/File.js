/**
 *	Load translations
 *	: NodeJS - load all supported languages
 *	: Browser - load browser language only or default
 *
 *	@param path {String} e.g. '/localization/%%.json'
 *	
 *	export lang(s) to `Languages`
 */

(function(){

	Sources['file'] = {
		single: function(isoCode, path, callback){
		
			loadTranslation(path, function(data){
				lang_extend(isoCode, data);
				callback();
			});
			
		},
		/**
		 * - patter: e.g. '/localization/%%.json'
		 */
		many: function(pattern, langs, callback){
			var count = langs.length,
				max = count,
				i = -1;
			
			while (++i < max) {
				
				this.single(
					langs[i],
					pattern.replace('%%', langs[i]),
					onComplete
				);
			}
			function onComplete(){
				if (--count < 0)
					callback();
			}
		}
	};
	
	
	function loadTranslation(url, callback){
		if (include == null && is_Browser) {
			xhr(url, function(response){
				callback(response);
			});
			return;
		}
		
		var resource = is_Node
			? include.instance()
			: include
			;
		resource
			.ajax(url + '::Data')
			.done(function(resp) {
				callback(resp.ajax.Data);
			});
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
	
	
}());
