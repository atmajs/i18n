
function NodeLocalizer(){
	
	console.warn('<localizer> In node env. please call $L.fromReq(req)("someKey")');
	return localizer_create(lang_SUPPORT[0]);
}

NodeLocalizer.fromReq = function(req){
	if (req.$L !== void 0) 
		return req.$L;
	
	var lang = detect_fromRequest(req),
		localizer = localizer_create(lang)
		;
	return req.$L = localizer;
};