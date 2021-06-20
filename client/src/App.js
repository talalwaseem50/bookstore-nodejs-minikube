import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import SignIn from "./SignIn";
import Console from "./admin-components/Console";

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
                    <Route path="/Console"> <Console />  </Route>
                </Switch>
            </BrowserRouter>
        )
        
    }

}

export default App;
