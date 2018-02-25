export interface IOptions {
    lang?: string
    support?: string[]
}

export class Config {
    lang: string
    
    support: string[] = [ 'en' ];

    setLanguages (support: string[]) {
        this.support  = support;
    }

    contains (isoCode: string) {
        return this.support.indexOf(isoCode) !== -1;
    }
};


export default new Config;