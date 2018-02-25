import { isNode } from '../global'
import { NodeLocalizer } from '../localizer/NodeLocalizer'
import { SourceFactory } from '../sources/SourceFactory'

if (isNode) {
	/* { path, support } */
	NodeLocalizer.middleware = function(config: { path: string, support?: string[] }){
		
		return function(req:Request, res, next){
			SourceFactory
				.loadSingle(config, req)
				.done(function(){
					req.$L = NodeLocalizer.fromReq(req);
					next();
				});
		};
	};
}
