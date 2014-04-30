	
var include = global.include || (global.atma && global.atma.include),
	mask = global.mask || (global.atma && global.atma.mask),
	Class = global.Class || (global.atma && global.atma.Class)
	;

if (include == null && is_Node) {
	var atma = require('atma-libs/exports');
	
	include = atma.include;
	mask = atma.mask;
	Class = atma.Class;
}

// atma-formatter
var __format = is_Node
	? require('atma-formatter')
	: window.Formatter || (mask && mask.$utils.format)
	;
if (__format == null) 
	throw Error('atma-formatter is not preloaded.');

