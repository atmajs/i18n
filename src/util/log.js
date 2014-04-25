var log_error;
(function(){
	
	log_error = function(){
		var args = _Array_slice.call(arguments);
		args.unshift('<i18n>');
		console.log.apply(console, args);
	};
	
}());