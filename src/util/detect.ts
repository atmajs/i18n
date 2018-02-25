import { rgx_find } from './rgx'
import { global } from '../global'
import config from '../Config'

export function detect_fromBrowser() {

	var lang = fromSearch(global.location.search);
	if (lang == null)
		lang = rgx_find(global.navigator.language, /^(\w+)/, 1);

	lang = lang.toLowerCase();
	return config.contains(lang)
		? lang
		: config.support[0];
};

export function detect_fromRequest(req: Request) {
	// en-US,en;q=0.8,ru;q=0.6,de;q=0.4
	var queryIndex = req.url.indexOf('?'),
		lang;

	if (req.url.indexOf('?') !== -1) {
		lang = fromSearch(req.url);
		if (config.contains(lang))
			return lang;
	}

	let langs = req.headers['accept-language'];
	if (langs == null)
		return config.support[0];

	langs = langs
		.replace(/\s*/g, '')
		.toLowerCase();

	var array = langs.split(','),
		imax = array.length,
		i = -1,
		index, x;

	while (++i < imax) {
		x = array[i];
		index = x.indexOf(';');
		lang = index === -1
			? x
			: x.substring(0, index);

		if (config.contains(lang))
			return lang;
	}

	return config.support[0];
};

// private

function fromSearch(search) {
	return rgx_find(search, /language=(\w+)/, 1);
}
