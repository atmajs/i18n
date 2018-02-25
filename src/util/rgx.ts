export function rgx_find(str: string, rgx: RegExp, groupNumber: number) {
	var match = rgx.exec(str);

	if (match && match[groupNumber])
		return match[groupNumber];

	return null;
}