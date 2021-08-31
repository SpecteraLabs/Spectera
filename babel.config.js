module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: '16.8.0',
				},
			},
		],
		'@babel/preset-typescript',
	],
	plugins: [
		[
			'@babel/plugin-proposal-decorators',
			{
				legacy: true,
			},
		],
		'@babel/plugin-proposal-class-properties',
		'const-enum',
	],
};
