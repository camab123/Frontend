import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducer, { logout, register } from './auth';

const initialState = {
    
};

const reducers = combineReducers({
    auth: authReducer,
});

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk)
);

export default store;