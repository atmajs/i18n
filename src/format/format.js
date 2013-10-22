var format;

(function(){
	
	// import parse.js
	// import build.js
	// import type.js
	
	format = function(str, args){
		
		
		var parsed = format_parse(str),
			__args = arguments;
		
		
		if (arguments.length > 2) {
			__args = arguments;
		} else if (args != null && typeof args !== 'object') {
			__args = arguments;
		}
		
		
		return format_build(parsed, __args);
	};
	
}());