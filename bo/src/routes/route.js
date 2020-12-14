import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Login from "../components/Login";
import Home from "../components/Home";
import Panel from "../components/Panel";
import AccessDenied from "../components/AccessDenied";

export default function route() {
    return(
        <Router>
            <Switch>
                <Route exact path={"/"} component={Home}/>
                <Route exact path={"/login"} component={Login}/>
                <Route exact path={"/panel"} component={Panel}/>
                <Route exact path={"/accessDenied"} component={AccessDenied}/>
            </Switch>
        </Router>
    );
}