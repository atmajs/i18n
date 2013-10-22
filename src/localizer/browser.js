
function BrowserLocalizer() {
	
	BrowserLocalizer = localizer_create(detect_fromBrowser());
	
	return BrowserLocalizer.apply(null, arguments);
}