var BrowserLocalizer;
(function(){
	
	BrowserLocalizer = function() {
		return localizer__.apply(null, arguments);
	};
	
	var localizer__ = function(){
		localizer__ = localizer_create(detect_fromBrowser());
		return localizer__.apply(null, arguments);
	};
}());
