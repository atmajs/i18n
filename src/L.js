
var $L = is_Node
	? NodeLocalizer
	: BrowserLocalizer
	;

if (mask != null) {
	// import L.mask-util.js
	
	mask.registerUtil('L', is_Node
		? L_util_NODE
		: L_util_BROWSER
	);
}

$L.loadSingle = SourceFactory.loadSingle;

// import node/middleware.js