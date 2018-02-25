import { ILocalizer } from "./ILocalizer";
import { detect_fromBrowser } from "../util/detect";
import { localizer_create } from "./Factory";
import config, { IOptions } from "../Config";
import { SourceFactory } from "../sources/SourceFactory";
import { lang_extend } from "../util/lang";

let localizer: ILocalizer;

export const BrowserLocalizer: ILocalizer = <any> function(...args) {
	if (localizer == null) {
		Utils.create(detect_fromBrowser());
	}
	return localizer(...args);
};

BrowserLocalizer.loadSingle = SourceFactory.loadSingle;
BrowserLocalizer.lang = 'default';
BrowserLocalizer.extend = lang_extend;

BrowserLocalizer.config = function (opts: IOptions) {
	if (opts.lang) {
		Utils.create(opts.lang);
	}
	if (opts.support) {
		config.setLanguages(opts.support);
	}
	return this;
};


namespace Utils {
	export function create (lang: string) {
		localizer = localizer_create(lang);
		BrowserLocalizer.lang = localizer.lang;
		BrowserLocalizer.extend = localizer.extend;
		
		config.lang = lang;
	}
}