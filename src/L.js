
var $L = is_NODE
	? NodeLocalizer
	: BrowserLocalizer
	;

mask.registerUtil('L', is_NODE
	? L_util_NODE
	: L_util_BROWSER
);


function L_util_NODE(key, model, ctx){
	
	return $L(ctx.req, key, model);
}

function L_util_BROWSER(key, model){
	
	return $L(key, model);
}
