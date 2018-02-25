export class Deferred {
	_isAsync =true

	_done = null
	_fail = null
	_always = null
	_resolved = null
	_rejected = null

	defer (){
		this._rejected = null;
		this._resolved = null;
	}

	resolve () {
		var done = this._done,
			always = this._always
			;

		this._resolved = arguments;

		dfr_clearListeners(this);
		arr_callOnce(done, this, arguments);
		arr_callOnce(always, this, [ this ]);

		return this;
	}

	reject (...args) {
		var fail = this._fail,
			always = this._always
			;

		this._rejected = args;

		dfr_clearListeners(this);
		arr_callOnce(fail, this, args);
		arr_callOnce(always, this, [ this ]);

		return this;
	}

	resolveDelegate (){
		return fn_proxy(this.resolve, this);
	}

	rejectDelegate (){
		return fn_proxy(this.reject, this);
	}

	then (onSuccess, onError){
		return this.done(onSuccess).fail(onError);
	}

	done (callback) {

		return dfr_bind(
			this,
			this._resolved,
			this._done || (this._done = []),
			callback
		);
	}

	fail (callback) {

		return dfr_bind(
			this,
			this._rejected,
			this._fail || (this._fail = []),
			callback
		);
	}

	always (callback) {

		return dfr_bind(
			this,
			this._rejected || this._resolved,
			this._always || (this._always = []),
			callback
		);
	}
};

// PRIVATE

function dfr_bind(dfr, arguments_, listeners, callback){
	if (callback == null) 
		return dfr;

	if ( arguments_ != null) 
		callback.apply(dfr, arguments_);
	else 
		listeners.push(callback);

	return dfr;
}

function dfr_clearListeners(dfr) {
	dfr._done = null;
	dfr._fail = null;
	dfr._always = null;
}

function arr_callOnce(arr, ctx, args) {
	if (arr == null) 
		return;

	var imax = arr.length,
		i = -1,
		fn;
	while ( ++i < imax ) {
		fn = arr[i];

		if (fn) 
			fn.apply(ctx, args);
	}
	arr.length = 0;
}

function fn_proxy(fn, ctx) {

	return function() {
		return fn.apply(ctx, arguments);
	};
}