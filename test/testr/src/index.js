import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import { hashHistory } from 'react-router'
// import RouteMap from './router/index.jsx'

// import createBrowserHistory from 'history/createBrowserHistory'
// const history = createBrowserHistory()

// import G2tb from './home/g2'
// import data from './home/dateSet'
// import Copys from './home/copyText'

// import assgin from 'object.assign'
// console.log(data.states())
// let a ={a:1},b={b:2}
// let v =assgin(a,b)
// console.log(v)

import Controlled from './home/controlled'

import Demo1 from './home/demo1'
import Action from './home/actonLink'
import HighC1 from './highComponent/highC1'


// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    // <RouteMap history={history}/>,
    // <RouteMap history={history}>
    // <RouteMap />,
    // </RouteMap>,
    <div>
        <HighC1/>

        <Demo1 value=''/>
        <Action/>
        <Controlled control={false}/>
    </div>,
    document.getElementById('root')
);
registerServiceWorker();
