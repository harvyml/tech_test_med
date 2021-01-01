module.exports = {
	mode: "development",
	entry: {
		app_bundle: './src/hydrated/App.js',
		register_bundle: './src/hydrated/Register.js',
		login_bundle: './src/hydrated/Login.js',
		speaker_bundle: './src/hydrated/Speaker.js',
		attendant_bundle: './src/hydrated/Attendant.js',
		panel_bundle: './src/hydrated/Panel.js'
	},
	module: {
		rules: [//These are the loaders
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		]

	},
	output: {
		filename: '[name].js',
		path: __dirname + '/public/bundles',
		publicPath: '/public/bundles'
	},
	watch: true
}