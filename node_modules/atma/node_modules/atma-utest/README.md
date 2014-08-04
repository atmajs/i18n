µTEST
----
[![Build Status](https://travis-ci.org/atmajs/utest.png?branch=master)](https://travis-ci.org/atmajs/utest)

_TDD and Unit Testing plugin for Atma.Toolkit_

- [Overview](#overview)
- [Simplest example](#simplest-example)
- [Assertions](#assertions)
- [UTest Class](#utest-class)
	- [http](#utest-server)
- [Config](#config)
- [CLI Sugar](#cli-sugar)
- [ES6](#es6)
- [Simplest CommonJS test](#simplest-commonjs-test)
- [Screenshot](#screenshot)

##### Install
```$ npm install atma -g```


Create Tests. Covers all use cases - from most simple test to complex-application test.

##### Overview

- **Node.js**-runner  ` $ atma test foo `.
- **Browser**-runner  
	- with `atma` you create a test server (` $ atma server `), open a test-runner-page in one or many browsers (` http://localhost:5777/utest/ `), _so slaves are captured by the server_. And you are ready to run your scripts in dom environment ` $ atma test foo -browser `
	- UPD: (up from v.8.14) if the server is not running, uTest starts the server, launches the system default browser, navigates to the slave capture url and resumes the runner.
- **Watcher**       ` -watch ` flag allows atma test instance not to be closed after testing, but waiting for any changes in files, that were used in unit tests and all its includejs dependencies.
- **Environments** By default,  there will be available additional libraries in all tests
	
	- [IncludeJS](https://github.com/atmajs/IncludeJS)
	- [MaskJS](https://github.com/atmajs/MaskJS)
	- [ClassJS](https://github.com/atmajs/ClassJS)
	- [IO](https://github.com/atmajs/atma-io)
	- [Logger](https://github.com/atmajs/atma-logger)
	- jQuery
	- SinonJS
	
- **Test Suites**   though this testing system does not require from developer to define test suites, as from example below, but with this class, developer can define test suites more properly
- **Pages**         Load and Test webpages
- **Configs**       configurations for more complex projects
- Why not to use headless browser testrunner, like PhantomJS? `Server-Slave` pattern has much more advantages:
	- Launch slave url in any browser - Chrome, IE(9+), Opera, Mozilla. _PhantomJS is only webkit based._
	- Much better debugging. Use browsers developer tools to set breakpoints in your tests and assertions.

Default test extension: `*.test*`

##### Simplest example
```
/myscript
   app.js
   app.test
```
_app.js_
```javascript
var Application = { version: 1 };
```
_app.test_
```javascript
eq(Application.version, 1); // alias for assert.equal()
```

> More Examples you can find in most [Atma.js Libraries](https://github.com/atmajs)

- Node.js: 
	```coffeescript
		cd myscript
		atma test app
		# OR atma test app -watch
	```
- Browser:
	```coffeescript
		cd myscript
		atma test app -browser
		# OR atma test app -browser -watch
	```

This is the simpliest test case. 
> As those 2 files ` app.js/app.test ` are in the same directory, `app.js` will be preloaded when 'app.test' is started

_app.test_
```javascript
include.inject('subfolder/app.js').done(function(){
	eq(Application.version,1);
})
```

- ```include.inject``` - matters only in nodejs test runner. As ```include.js``` is like require() - scripts are evaluated in there module scope, so Application object will be not available in our test, but ```inject``` forces script to be evaluated in the same context/scope as the unit tests one.


##### Assertions

Embedded Assertion Library - [Documentation](https://github.com/atmajs/assertion).

Quick overview (note the global aliases and jQuery assertions for browser tests):

```javascript
  assert.equal(arg1, arg2, ?message);
  // eq_
  
  assert.notEqual
  // notEq_

  assert.strictEqual
  // strictEq_

  assert.notStrictEqual
  // notStrictEq_

  assert.deepEq
  // deepEq_

  assert.notDeepEq
  // notDeepEq_

  assert.has
  // has_
  
  assert.hasNot
  // hasNot_
  
  assert.is
  // is_
  assert.isNot
  // isNot_
  
  assert.await(Function, name)
  
  $.fn.has_
  $.fn.hasNot_
  $.fn.eq_
  $.fn.notEq_
  $.fn.deepEq_
  $.fn.notDeepEq_
  $.fn.is_
  $.fn.isNot_
  
```

##### UTest Class

```javascript
UTest({
	'check object': function(){
		var A = function(){this.letter = 'A'};
		
		assert.deepEqual({letter: 'A'}, new A);
	},
	
	'async test': function(done){
		$.get('/rest/request').then(function(response){
			assert.equal(response, 'foo');
			done();
		})
	},
	
	'$before': function(){
		// function is called before tests cases are run
		// (supports async call - use done as first argument)
	},
	'$teardown': function(){
		// function is called after each test case
		// (supports async call)
	},
	
	'$after': function(){
		// function is called after all test cases from
		// this particular Utest instance are completed
	}
});
```

##### UTest server

- load any web page
	
	```javascript
	UTest
		.server
		.request(url [, method, bodyArgs], callback);
		
	UTest({
		'google has input': function(done){
			UTest
				.server
				.request('http://google.com', function(error, document, window){
					eq_(error, null);
					
					$(document)
						.has_('input[type="text"]');
					done();
				})
		}
	});
	```
	
- render MaskJS server-side

	```javascript
	UTest
		.server
		.render(template, model, callback);
		
	UTest({
		'render title': function(done){
			var template = 'h4 > "Hello, ~[name]"',
				model = { name: 'World' };
			UTest
				.server
				.render(template, model, function(error, document, window){
					$(document)
						.has_('html', 'Hello, world');
						
					done();
				})
		}
	});
	```

##### Config

```
/app-project
    /src
        ...
    /test
        config.js
        ...
```

```javascript
module.exports = {
	suites: {
		'suite name': {
			exec: <String> 'node' | 'dom',

			// preloading scripts
            // (path is relative to projects directory)
			env: String | Array<String>,
            
            // path to tests, glob pattern is also supported
            // e.g. test/**-node.test
			tests: String | Array<String>
		}
	}
};
```

##### CLI Sugar
- `atma test`

	Load the configuration from `%CWD%/test/config.js` and run all tests and suites

- `atma test foo`

	Run the test `%CWD%/test/foo.test`. If exists, the configuration will also be loaded and the `ENV` property for this path will be extracted to preload the required resources.
	
	```javascript
	// test/config.js
	module.exports = {
		suites: {
			baz: {
				exec: 'dom',
				env: 'lib/baz.js'
				tests: 'test/baz/**.test
			}
		}
	}
	```
	`atma test baz/quux` - run single file test and the `lib/baz.js` will be preloaded.

- `atma test baz/**.test`

	Run files by glob matching
	
- CLI flags
	- `-browser` runs a test in browser
	- `-node` runs a test in Node.js
	- `-watch` watches for file changes and reruns the tests

##### ES6
Write your test using EcmaScript 6. This is possible due to [Google Traceur Compiler](https://github.com/google/traceur-compiler) and the [Atma.Toolkit Plugin](https://github.com/atmajs/atma-loader-traceur).

**How to start?**

- Install the plugin
	```bash
	$ atma plugin install atma-loader-traceur
	```
- Specify `test` extension to be handled by the tracuer. Edit your `package.json` to have at least:
	```json
	{
		"atma": {
			"settings": {
				"traceur-extension": "test"
			}
		}
	}
	```
**Sample**
```es6
// foo.test
has_(` foo-multiline-string `, /foo/);
```
```bash
$ atma test foo.test
```

##### Simplest CommonJS test
The first possible solution to test CommonJS Modules is just to `require` them as usual in tests and perform some assertions.
But there is simpler approach to load it once for all tests with exporting the module's exports to the globals.
```javascript
// src/some.js
module.exports = {
	addOne: function(n){
		return n + 1;
    }	
};
```
```javascript
// test/mytest.test
eq(foo.addOne(1), 2);
```

```javascript
// test/config.js
module.exports = {
	env: ['src/some.js::foo'],
	tests: 'test/*.test'
};
```

```$ cd app-project```
```$ atma test```

Here was used alias-feature of the IncludeJS. So when 'some.js' is required, its exports object is then set to globals with alias var name. From the example - it was 'foo'.

##### Screenshot

![utest screenshot](https://github.com/atmajs/utest/raw/master/resources/screen.png)