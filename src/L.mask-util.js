var L_util_NODE,
	L_util_BROWSER
	;
	
(function(){

	L_util_NODE = function(){
		return $L.fromReq(ctx.req)(key, model);
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
			ctr = args[3]
			;
		
		switch (str.charCodeAt(0)) {
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
