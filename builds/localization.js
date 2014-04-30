(function(root, factory){
	"use strict";

	var _global, _exports;
	
	if (typeof exports !== 'undefined' && (root === exports || root == null)){
		// raw nodejs module
		_global = _exports = global;
	}
	
	if (_global == null) 
		_global = typeof window === 'undefined'
			? global
			: window
			;
	
	if (_exports == null) 
		_exports = root || _global;
	
	
	global.$L = factory(_global, _exports);
	
	if (typeof module !== 'undefined')
		module.exports = global.$L;
		
	
}(this, function(global){
	"use strict";
	
	// import /src/vars.js
	// import /src/dependency.js
	
	// import /src/util/obj.js
	// import /src/util/rgx.js
	// import /src/util/log.js
	// import /src/util/detect.js
	// import /src/util/lang.js
	// import /src/util/Deferred.js
	
	// import /src/sources/exports.js
	
	// import /src/localizer/localizer.js
	// import /src/localizer/browser.js
	// import /src/localizer/node.js
	
	// import /src/L.js
	
	
	
	lang_tryLoad();
	return $L;
}));