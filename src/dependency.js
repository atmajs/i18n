	
var atma = global.atma || global;

if (atma.mask == null && is_NODE) 
	atma = require('atma-libs/exports');

var mask = atma.mask,
	include = atma.include
	;


// atma-formatter
var __format = is_NODE
	? require('atma-formatter')
	: window.Formatter || (mask && mask.$utils.format)
	;
if (__format == null) 
	throw Error('atma-formatter is not preloaded.');

