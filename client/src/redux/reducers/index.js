import { combineReducers } from "redux";

// require all modules on this directory except index.js
const req = require.context("./", false, /^\.[\\/]+(?!index).*\.js$/);

const reducers = req
	.keys()
	.map(req)
	.reduce((accumulator, { default: defaultExport }) => {
		accumulator[defaultExport.name] = defaultExport;
		return accumulator;
	}, {});

const rootReducer = combineReducers(reducers);

export default rootReducer;
