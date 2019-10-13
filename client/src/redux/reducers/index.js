// require all modules on this directory except index.js
// const req = require.context("./", false, /^\.[\\/]+(?!index).*\.js$/);

// export default req
// 	.keys()
// 	.map(req)
// 	.reduce((accumulator, { default: defaultExport }) => {
// 		console.log('index reducer accumulator =', accumulator)
// 		accumulator[defaultExport.name] = defaultExport;
// 		return accumulator;
// 	}, {});

import authToken from './authTokenReducer'
import chat from './chatReducer'
import error from './errorReducer'
import project from './project'
import user from './userReducer'
import usersList from './usersListReducer'

export default {authToken, chat, error, project, user, usersList}