
function NodeLocalizer(){
	
	console.error('<localizer> In node env. please call $L.fromReq(req)("someKey")');
	return localizer_create(lang_SUPPORT[0]);
}

NodeLocalizer.fromReq = function(req){
	var lang = req.lang || (req.lang = detect_fromRequest(req));
	
	return localizer_create(lang);
};