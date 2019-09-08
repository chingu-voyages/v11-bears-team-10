// require all modules on this directory except index.js
const req = require.context("./", false, /^\.[\\/]+(?!index).*\.js$/);

const middlewares = req
	.keys()
	.map(req)
	.map(({ default: defaultExport }) => defaultExport);

export default middlewares;
