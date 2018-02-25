import { ILocalizer } from "./ILocalizer";
import { detect_fromBrowser, detect_fromRequest } from "../util/detect";
import { localizer_create } from "./Factory";
import config, { IOptions } from "../Config";
import { SourceFactory } from "../sources/SourceFactory";
import { lang_extend } from "../util/lang";

export const NodeLocalizer: ILocalizer = <any> function(...args) {
	console.warn('<localizer> In node env. please call $L.fromReq(req)("someKey")');
	return localizer_create(config.lang || config.support[0]);
};

NodeLocalizer.loadSingle = SourceFactory.loadSingle;
NodeLocalizer.lang = 'default';
NodeLocalizer.extend = lang_extend;

NodeLocalizer.config = function (opts: IOptions) {
	if (opts.lang) {
		config.lang = opts.lang;
	}
	if (opts.support) {
		config.setLanguages(opts.support);
	}
	return this;
};


NodeLocalizer.fromReq = function(req: Request){	
	if (req.$L !== void 0) 
		return req.$L;
	
	var lang = detect_fromRequest(req),
		localizer = localizer_create(lang)
		;
	return req.$L = localizer;
};


declare global {
	interface Request {
		$L: ILocalizer
	}
}

