### Localization Module (_NodeJS and Browser_)
----
[![Build Status](https://travis-ci.org/atmajs/i18n.svg?branch=master)](https://travis-ci.org/atmajs/i18n)


- [MaskJS](https://github.com/atmajs/MaskJS) Localization Util
- Localization Function

#### Node.js
Resolves language from current request _(middleware)_

#### Browser
Resolves language from ```navigator.language``` or ```location.query ('/?language=en') ```

>  If the language is not supported, the default one is taken.

#### Formatter
[Atma-Formatter](https://github.com/atmajs/util-format) is used to format/interpolate strings.

#### Pluralization
Refer to the `atma-formatter`.

#### Usage

##### Mask Util

- simple,  ```~[L:id]```
- formatting

_Example:_
```scss
	header > '~[L:welcomeId, name]'
	// same as
	header > '~[L:"welcomeId", name]'
```
```javascript
$L.extend('en', {
	welcome: 'Hello {0}!'
});
mask.render(template, { name: 'Baz' });
```

##### Function

**Browser** @see [examples](examples)
```javascript
	$L('titleHello');
```

**Node**
```javascript
	connect
		.use($L.middleware({
			support: [ 'en', 'de', 'ru' ],
			path: '/public/localization/%%.json'
		});
	// Aftewards each `req` has `$L` function.
	// Or use direct
	$L.fromReq(req)('id');
```

### Configuration

##### IncludeJS

###### Browser
Load this library with IncludeJS - after defining the list of supported languages and the path to translations,
it will load also supported translations

```javascript
include
	.embed('/atma/localization.js?path=/public/i18n/%%.json&langs=de,it,fr')
	.done(function(){
		// appropriate translationis is loaded and ready to use
		$L('welcome', 'Baz')
	});
	
```

###### NodeJS
Use the `middleware` function so that not all translations are loaded at once, but only with the first incomming request.


----
(c) MIT, Atma.js Project