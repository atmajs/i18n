var format_parse;

(function(){
	
	
	var _cache = {};
	
	format_parse = function(str){
		if (_cache[str]) 
			return _cache[str];
		
		
		var index = 0,
			nextIndex,
			end,
			i = 0,
			parts = [];
		
		while(1){
			
			nextIndex = str.indexOf('{', index);
			
			if (nextIndex === -1) 
				break;
			
			
			if (nextIndex > 0 && str.charCodeAt(nextIndex - 1) === 92) {
				// \ - not escaped
				continue;
			}
			
			parts[i++] = str.substring(index, nextIndex);
			index = nextIndex;
			
			end = str.indexOf('}', nextIndex);
			if (end === -1) {
				console.error('<str:format> interpolation end quote not found', str);
				break;
			}
			
			parts[i++] = format_parseSingle(str.substring(index + 1, end));
			
			index = end + 1;
		}
		
		parts[i] = str.substring(index);
		
		return parts;
	};
	
	
	function format_parseSingle(str){
		var colon = str.indexOf(':'),
			index, spec;
		
		if (colon === -1) {
			index = parseInt(str, 10);
		} else{
			
			index = parseInt(str.substring(0, colon), 10);
			spec = str.substring(colon + 1);
		}
		
		if (isNaN(index)) {
			// if DEBUG
			console.error('<str:format> argument index could not be parsed', str);
			// endif
			return -1;
		}
		
		if (spec == null) 
			return index;
		
		
		return {
			index: index,
			spec: spec
		};
	}
	
	
}());
