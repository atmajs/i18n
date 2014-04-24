Atma Localization Module for Node.js and Browser
----

- [MaskJS](https://github.com/atmajs/MaskJS) Localization Util
- Localization Function

#### Node.js
Resolves language from current request like a middleware. If language not supported default language is taken.

#### Browser
Resolves language from ```navigator.language``` or ```location.query ('/?language=en') ```

### Translations

For now, file with translations is of a json format: ``` { id: translation } ```. And default path to it is ``` /localization/%ISO_CODE%.json```


### Util

- simple,  ```~[L:id]```
- formatting

E.g.
```css
	header > '~[L:titleHello]'
```

### Function

**Browser**
```javascript
	$L('titleHello');
```

**Node**
```javascript
	$L(req, 'titleHello');
```


### Format

Interpolates translated string, and inserts dynamic values. 

Patterns for interpolations:
- Simple, ```{DYNAMIC_ARGUMENT_INDEX}```
- **Work in progress** With Formatting, like Dates, Numbers: ```{DYNAMIC_ARGUMENT_INDEX:FORMAT_SPECIFICATION}```

Example: 
```
// en.json
{ "bar": "Foo {0}, Bar!" }
```

_From javascript:_
```javascript
$L('bar', 'X') // -> Foo X, Bar!
```

_From mask:_
```javascript
div > "~[L:bar, 'X']"

div > "This example takes value from model by property 'xValue': ~[L: bar, xValue ]"
```

### Settings

To change localization-files directory, or to change available languages list, use parameters when including the library

```javascript

include
	.js('/atma/localization.js?path=/public/i18n/%%.json&langs=de,it,fr')
	.done(function(){
		// ...
	})
	
```
