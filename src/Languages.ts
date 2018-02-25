export class Language {

}

export class Translations {
    
    [key: string]: string
}

export class Languages {

    [key: string]: Translations
}

export default <Languages><any>{};