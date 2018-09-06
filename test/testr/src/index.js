import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import { hashHistory } from 'react-router'
import RouteMap from './router/index.jsx'

import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    // <RouteMap history={history}/>,
    // <RouteMap history={history}>
    <RouteMap />,
    // </RouteMap>,
    document.getElementById('root')
);
registerServiceWorker();
