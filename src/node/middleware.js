
if (is_Node) {

	/* { path, support } */
	$L.middleware = function(config){
		
		return function(req, res, next){
			$L
				.loadSingle(config, req)
				.done(function(){
					$L.fromReq(req);
					next();
				});
		};
	};
}
