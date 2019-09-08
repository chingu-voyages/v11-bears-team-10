import { applyMiddleware, createStore } from 'redux'
import thunkMIddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import loggerMiddleware from './middleware/logger'
import rootReducer from '../redux/reducers/index'


export default function configureAppStore(preloadedState){
    const middleWares = [loggerMiddleware, thunkMIddleware]
    const middleWareEnhancers = applyMiddleware(...middleWares)
    const composedEnhancers = composeWithDevTools(...[middleWareEnhancers])

    //create the store
    const store = createStore(rootReducer, preloadedState, composedEnhancers)

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('../redux/reducers/index', () => store.replaceReducer(rootReducer))
    }

    return store
}