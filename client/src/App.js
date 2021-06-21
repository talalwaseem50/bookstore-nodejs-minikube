import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import SignIn from "./SignIn";
import Console from "./admin-components/Console";
import Dashboard from "./user-components/Dashboard"

class App extends React.Component {

    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/Console" component={Console} />
                    <Route path="/Dashboard" component={Dashboard} />
                </Switch>
            </BrowserRouter>
        )
        
    }

}

export default App;
