
function NodeLocalizer(){
	
	console.error('<localizer> In node env. please call $L.fromReq(req)("someKey")');
	return localizer_create(lang_SUPPORT[0]);
}

NodeLocalizer.fromReq = function(req){
	if (req.localizer) 
		return req.localizer;
	
	var lang = detect_fromRequest(req),
		localizer = localizer_create(lang)
		;
	return req.localizer = localizer;
};