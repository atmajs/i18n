import config, { IOptions } from '../Config'
import languages, { Translations } from '../Languages'
import { obj_extend } from './obj'
import { include, isBrowser, isNode } from '../global'
import { SourceFactory } from '../sources/SourceFactory'

export function lang_contains(isoCode) {
	return config.contains(isoCode);
};


export function lang_extend(mix: string | Translations, translations?: Translations) {
	if (typeof mix === 'string') {
		let isoCode = mix;
		if (languages[isoCode] == null) {
			languages[isoCode] = translations;
			return;
		}
		obj_extend(languages[isoCode], translations);
		return this;
	}

	let lang = typeof this.lang === 'string' && this.lang.length > 0 
		? this.lang 
		: 'default'
		;
	
	lang_extend(lang, mix);
	return this;

};


// check include params
export function lang_tryLoad(callback?) {

	//#if (BROWSER)
	let src;
	if (typeof include !== 'undefined' && include.route) {
		src = include.route.path;
	} else {
		let scripts = document.getElementsByTagName('script');
		let last = scripts[scripts.length - 1];	
		src = last && last.src;
	}
	if (src == null) {
		return;
	}
	let i = src.indexOf('?');
	if (i === -1) {
		return;
	}
	let search = src.substring(i + 1);
	let params:any = {};
	let paars = search.split('&');
	for (let i = 0; i < paars.length; i++) {
		let keyValue = paars[i].split('=');
		params[keyValue[0]] = keyValue[1];
	}

	if (params.support)
		config.setLanguages(params.support.split(','));

	var path = params.path;
	if (path) {
		if (isBrowser) {
			SourceFactory
				.loadSingle({ path: path })
				.done(callback);
			return;
		}

		SourceFactory
			.loadAll({ path: path })
			.done(callback);
		return;
	}
	//#endif
	callback && callback();
};

