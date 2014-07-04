var L_util_NODE,
	L_util_BROWSER
	;
	
(function(){

	L_util_NODE = function(key, model, ctx){
		return localize($L.fromReq(ctx.req), arguments);
	};
	
	L_util_BROWSER = function(){
		return localize($L, arguments);
	};

	// private
	var evalStatements__ = mask.Utils.Expression.evalStatements;
	
	function localize($L, args) {
		return $L.apply(null, parse_arguments(args));
	}
	
	function parse_arguments(args){
		var str = args[0].trim(),
			model = args[1],
			ctx = args[2],
			ctr = args[4]
			;
		
		switch (str.charCodeAt(0)) {
			case 40: // (
			case 34: // "
			case 39: // '
				return evalStatements__(str, model, ctx, ctr);
		}
		
		var comma = str.indexOf(',');
		if (comma === -1) 
			return [str];
		
		args = evalStatements__(str.substring(comma + 1), model, ctx, ctr);
		args.unshift(str.substring(0, comma));
		
		return args;
	}
	
}());
