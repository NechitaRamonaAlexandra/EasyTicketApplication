import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import fetchUser from './reducers/userReducer';
import fetchAdmin from './reducers/adminReducer';
import  thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    form: formReducer,
    user: fetchUser,
    admin: fetchAdmin
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
        <Provider store={store} >
            <App />
        </Provider>,
  document.getElementById('root')
);


