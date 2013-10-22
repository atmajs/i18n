
function rgx_find(str, rgx, groupNumber) {
	var match = rgx.exec(str);

	if (match && match[groupNumber])
		return match[groupNumber];

	return null;
}