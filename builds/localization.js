(function(root, factory){
	"use strict";

	var _global, _exports;
	
	if (typeof exports !== 'undefined' && (root === exports || root == null)){
		// raw nodejs module
		_global = _exports = global;
	}
	
	if (_global == null) 
		_global = typeof window === 'undefined' ? global : window;
	
	if (_exports == null) 
		_exports = root || _global;
	
	
	factory(_global, _exports);
	
}(this, function(global, exports){
	"use strict";
	
	// import /src/vars.js
	// import /src/dependency.js
	
	// import /src/util/obj.js
	// import /src/util/rgx.js
	// import /src/util/log.js
	// import /src/util/detect.js
	// import /src/util/lang.js
	// import /src/sources/exports.js
	
	// import /src/localizer/localizer.js
	// import /src/localizer/browser.js
	// import /src/localizer/node.js
	
	// import /src/L.js
	
	
	
	lang_tryLoad();
	exports.$L = $L;
	
}));