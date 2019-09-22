// require all modules on this directory except index.js
const req = require.context("./", false, /^\.[\\/]+(?!index).*\.js$/);

export default req
	.keys()
	.map(req)
	.map(({ default: defaultExport }) => defaultExport);
