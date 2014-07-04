module.exports = {
	suites: {
		node: {
			exec: 'node',
			env: [
				'lib/localization.js::$L'
			],
			tests: 'test/*.test'
		},
		
		examples: {
			exec: 'dom',
			tests: 'test/examples/**.test'
		},
		
		examples_node: {
			exec: 'node',
			tests: 'test/examples-node/**.test'
		}
	}
}