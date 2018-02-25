export function log_error(...args) {
	args.unshift('<i18n>');
	console.log.apply(console, args);
};
