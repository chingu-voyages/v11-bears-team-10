import { applyMiddleware, createStore } from "redux";
import thunkMIddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// an array of middlewares
import middlewares from "./middlewares/index";

import rootReducer from "./reducers/index";


export default function configureAppStore(preloadedState) {
	const middleWaresArr = [...middlewares, thunkMIddleware];
	const middleWareEnhancers = applyMiddleware(...middleWaresArr);
	const composedEnhancers = composeWithDevTools(middleWareEnhancers);

	//create the store
	return createStore(rootReducer, preloadedState, composedEnhancers);
}
