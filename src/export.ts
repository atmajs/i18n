import Localizer from './L'
import { mask } from './global'
import { mask_util } from './util/mask'
import { lang_tryLoad } from './util/lang';

if (mask != null) {
	mask.registerUtil('L', mask_util);
}

lang_tryLoad();

export = Localizer;