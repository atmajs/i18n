
var $L = is_NODE
	? NodeLocalizer
	: BrowserLocalizer
	;

if (mask != null) {
	// import L.util.js
	
	mask.registerUtil('L', is_NODE
		? L_util_NODE
		: L_util_BROWSER
	);
}


$L.load = SourceFactory.load;
$L.loadSingle = SourceFactory.loadSingle;