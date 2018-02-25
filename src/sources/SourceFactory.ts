import cfg from '../Config'
import { isBrowser, isNode} from '../global'
import { detect_fromRequest, detect_fromBrowser } from '../util/detect'
import { log_error } from '../util/log'
import { Deferred } from '../util/Deferred'
import { SourceFile } from './File'

export const SourceFactory = {
		
    loadAll: function(config){
        if (config.support) {
            cfg.setLanguages(config.support);
        }
        
        var count = cfg.support.length,
            imax = count,
            i = -1;
        
        while( ++i < imax){
            
            config.lang = cfg.support[i];
            this
                .loadSingle(config)
                .done(onComplete);
        }
        
        var dfr = new Deferred;
        function onComplete(){
            if (--count < 0)
                dfr.resolve();
        }
        
        return dfr;
    },
    
    /*
     * @param config:
     * 		{ path<Url||%%-Pattern>, ?support<Array>, ?lang }
     * @param mix:
     *  - NodeJS: req
     *  - Browser: null
     *
     * @returns Deferred
     */
    loadSingle: function(config: {path: string, support?: string[], lang?: string}, req?: Request){
        if (config.support) {
            cfg.setLanguages(config.support);
        }
        
        var lang = config.lang,
            path = config.path;
        
        if (lang == null) {
            lang = isNode
                ? detect_fromRequest(req)
                : detect_fromBrowser()
                ;
        }
        
        if (path) {
            if (path.indexOf('%%')) 
                path = path.replace('%%', lang);
            
            if (sources__[path]) 
                return sources__[path];
            
            var dfr = sources__[path] = new Deferred;
            
            SourceFile.single(lang, path, dfr.resolveDelegate());
            return dfr;
        }
        
        log_error('<Single Load: implemented `config.path` only>');
    }
};

const Sources = {};
const sources__ = {};
	
	