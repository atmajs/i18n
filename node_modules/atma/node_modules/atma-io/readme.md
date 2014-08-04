Atma Node.js IO Module
----
[![Build Status](https://travis-ci.org/atmajs/atma-io.svg?branch=master)](https://travis-ci.org/atmajs/atma-io)

Features:

- File Class
- Directory Class
- File `read/write` Middleware
- Sync

Mostly all operations are synchronous, and this is really useful in case of script applications or desktop applications, where the synchronous performance is not critical.


> This library is included into Atma.Toolkit, so creating custom scripts, you can use this API.

- [File](#file)
    - [API](#file-methods)
    - [Cache](#cache)
    - [Middleware](#file-middleware)
    - [Virtual File](#virtual-files)
- [Directory](#directory)
    - [API](#directory-methods)

### File

#### File methods

##### File constructor
```javascript
var file = new io.File('test.txt');
```
Path is always relative to the cwd (_except windows os, when drive letter is used_). To specify system absolute path, use `file://` protocol.

##### read
```javascript
var content = file.read( <?Object> {
    encoding: String | null, //> 'utf8'
    skipHooks: Boolean //> false
});
```
Read file's content. If `encoding` is set to null raw `Buffer` is returned.
For each `read` middleware pipeline is used, to skip it, set `skipHooks` to true.

##### write
```javascript
file.write(String | Buffer, <?Object>{
    skipHooks: Boolean
});
```

##### exists
```javascript
file.exists() //> Boolean;
```
##### copyTo
```javascript
file.copyTo(<String> location) //> Boolean;
```
##### rename
```javascript
file.rename(<String> filename)
```
##### remove
```javascript
file.remove()
```
##### watch
```javascript
file.watch(callback)
```
Watch file for changes

##### unwatch
```javascript
file.unwatch(callback) //> Boolean;
```

#### Cache
Each `read` will be cached. To control cache behaviour use next methods:

##### clearCache
```javascript
io.File.clearCache(<?String> path);
```
When `path` is `null`, then all cache is dropped.
##### disableCache
```javascript
io.File.disableCache();
```
##### enableCache
```javascript
io.File.disableCache();
```

#### short forms
There are some static methods, so that there is no need to initialize the File instance.
```javascript
io.File[method] //> Function(filepath, [..args])
// methods:
        'exists'
        'read'
        'write'
        'remove'
        'copyTo'
```

### File Middleware
Middleware pattern is used for all reads and writes. It can be used, for example, to compile coffee script to javascript on the fly. Or when reading `*.yml` file, the resulted content is not a YAML string, but already parsed object.

#### Extensions

To get the idea, look at the hook definition sample:
```javascript
io.File.registerExtensions({
    'coffee':[
        'conditions:read',
        'coffee-compiler:read',
        'uglify:write'
    ]
});
```
Each middleware has unique name and is registerd in this way:
```javascript
io.File.middleware['coffee'] = {
    read: function(<io.File> file, <Object> config){
        var coffee = require('coffee-script');
        file.content = coffee.compile(file.content);
    },
    write: function(<io.File> file, <Object> config){
        // ... do smth with `content` before disk write
    }
};
```

#### Advanced middleware
```javascript
io
    .File
    .getHookHandler()
    .register({
        regexp: <RegExp>,
        method: <'read'|'write'>,
        handler: <Function | Object> handler,
        zIndex: <?Number> // default: 0
    });
```
Path is matched by the regexp. The greater `zIndex` ist the later it is called in a pipeline, otherwise the handlers are called in the order they were registerd.

#### Embedded middlewares
_Lately will be converted into plugins, @see [Plugins](#Middleware Plugins)_
- read
    - coffee ( -> javascript )
    - markdown ( -> html )
    - jshint ( -> run jshint )
    - json ( -> JSON.parse is used )
    - yml ( -> YAML parser is used )
    
- write
    - uglify ( -> Minify source before write)
	- cssmin ( -> Minify source before write)
    - yml ( -> Stringify object to yml string )
    - json ( -> Stringify object to json )

#### Middleware Plugins
There additional `read`/`write` middlewares as atma plugins:

###### `atma plugin install NAME`

- `atma-loader-traceur` - [Traceur](https://github.com/atmajs/atma-loader-traceur)
- `atma-loader-less` - [Less](https://github.com/atmajs/atma-loader-less)


###### Combined middlewares
For example, you want to use Traceur middelware and jshint for reading `js` files:
_via javascript_
```javascript
io.File.registerExtensions({
	js: ['hint:read', 'atma-loader-traceur:read' /* ... */],
})
```
_via `package.json`_
```json
...
"atma": {
	"settings" : {
		"io": {
			"extensions": {
				"js": [ "hint:read", "atma-loader-traceur:read" ]
			}
		}
	}
}
```

### **Virtual** Files

Define with RegExp a File Handler to completely override  the read/write/exists/remove behaviour.

```javascript
io
    .File
    .getFactory()
    .registerHandler(/defaults\.json$/i, Class({
        exists: function(){
            return true;
        },
        read: function(){
            return { foo: 'bar' };
        }
    }));

```


### Directory

#### Directory methods

##### Constructor
```javascript
var dir = new io.Directory('src/');
```
Path is always relative to the cwd (_except windows os, when drive letter is used_). To specify system absolute path, use `file://` protocol.

##### exists
```javascript
dir.exists()//> Boolean
```
##### readFiles
```javascript
dir.readFiles(<?String> pattern).files // Array<io.Files>
```
Get list of all files in the directory. `pattern` is a glob pattern.
```javascript
// all javascript files, also from sub-directories
pattern = '*.js';
// only from base directory
pattern = '/*.js'
// only from sub-directories
pattern = '**/*.js'

dir.readFiles(pattern).files
```

##### copyTo
```javascript
dir.copyTo(<String> destination);
```

##### rename
```javascript
dir.rename(<String> folderName);
```

##### remove
```javascript
dir.remove()
```
Removes all sub directories and all files.

##### ensure
```javascript
dir.ensure()
```
Creates directory structure, if not already exists.

##### watch
```javascript
dir.watch(callback)
```
Watch directory for changes
##### unwatch
```javascript
dir.unwatch(callback)
```

##### short forms
There are some static methods, so that there is no need to initialize the Directory instance.
```javascript
io.Directory[method] //> Function(dirpath, [..args])
// methods:
    'exists',
    'readFiles',
    'ensure',
    'remove',
    'copyTo'
```


----
(c) MIT - Atma.js Project
