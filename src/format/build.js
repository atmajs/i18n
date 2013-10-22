
/*
 * args are all arguments passed to format function,
 * so values index starts from 1
 */

function format_build(array, args) {
	
	var even = true,
		i = 0,
		imax = array.length,
		str = '',
		format
		;
		
	for(; i < imax; i++){
		
		if (even === true) {
			even = false;
			
			str += array[i];
			continue;
		}
		even = true;
		
		format = array[i];
		
		if (typeof format === 'number') {
			
			str += args[format + 1];
			continue;
		}
		
		
		
		str += format_type(args[format.index + 1], format.spec);
	}
	
	return str;
}