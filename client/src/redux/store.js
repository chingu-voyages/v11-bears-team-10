import { applyMiddleware, createStore, combineReducers } from "redux";
import thunkMIddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// an array of middlewares
import middlewares from "./middlewares";

// a reducers object
import reducers from "./reducers";

export default function configureAppStore(preloadedState) {
	const middleWareEnhancers = applyMiddleware(thunkMIddleware, ...middlewares);
	const composedEnhancers = composeWithDevTools(middleWareEnhancers);

	//create the store
	return createStore(combineReducers(reducers), preloadedState, composedEnhancers);
}
