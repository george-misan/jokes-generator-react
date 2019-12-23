import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/rootReducer';

const store = createStore(rootReducer, composeWithDevTools());

const AppBoot = () => <Provider store={store}><App /></Provider>;

ReactDOM.render(<AppBoot />, document.getElementById('root'));
serviceWorker.unregister();
