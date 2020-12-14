import React from "react";

import {Redirect} from "react-router-dom";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            component: ""
        }
    }

    componentDidMount() {
        let component = localStorage.getItem("token") !== null ? "panel" : "login";
        this.setState({component: component});
    }

    render () {
        return <div>
            <Redirect to={"/" + this.state.component}/>
        </div>
    }
}

export default Home;