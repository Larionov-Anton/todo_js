const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index',
	output: {
		path: path.resolve(__dirname, 'public/js/'),
		filename: 'app.js',
		publicPath: '/js'
	}, 

	devServer: {
		static: {
		  directory: path.join(__dirname, 'public'),
		},
		compress: true,
		port: 9000,
	 },

	devtool: 'eval-cheap-source-map'
};

