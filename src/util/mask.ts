import Localizer from '../L'
import { mask } from '../global'
import { ILocalizer } from '../localizer/ILocalizer';

export const mask_util = function(key, model, ctx){
	//#if (NODE)
	return localize(Localizer.fromReq(ctx.req), arguments);
	//#endif

	/*#if (BROWSER)
	return localize(Localizer, arguments);
	*/
};


// private
var evalStatements__ = mask && mask.Utils.Expression.evalStatements;

function localize($L: ILocalizer, args) {
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
