import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import fileReducer from './reducers/file-reducer';
import editorReducer from './reducers/editor-reducer';

const rootReducer = combineReducers({
    file: fileReducer,
    editor: editorReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;