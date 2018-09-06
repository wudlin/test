import React from 'resct';
import { Router, Route, IndexRoute } from 'react-router'


import app from "../app.js"
import home from "../home"
import notFound from "../notFount"

class RouteMap extends React.component {
    updateHandle() {
        console.log('router updata')
    }
    render() {
        return (
            // <Router history={this.prop.history} onUpdate={this.updateHandle.bind(this)}>
                <Route path="/" component={app}>
                    {/* <IndexRoute component={home}/> */}
                </Route>
                    <Route path="/home" component={home} />
                    <Route path="*" component={notFound}/>
            // </Router>
        )
    }
}
export default RouteMap;