var $L = require('../lib/localization.node.js'),
	middleware = $L.middleware({
		support: [ 'en', 'de', 'ru' ],
		path: '/examples/lang/%%.json'
	});

module.exports = require('http')
		.createServer(function(req, res){
			
			middleware(req, res, function(){
				res.end(req.$L('hello'));
			})
		}).listen(5888);
		
	