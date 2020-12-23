import React from "react";

import {Redirect} from "react-router-dom";
import {disconnect} from "../../API/login";
import {getRole} from "../../API/user";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            component: ""
        }
    }

    async componentDidMount() {
        let component;
        if(localStorage.getItem("token") === null)
            component = "login";
        else {
            try {
                let role = await getRole(localStorage.getItem("token"));
                if(role === "user"){
                    component = "accessDenied";
                } else {
                    component = "panel";
                }
            } catch (e){
                disconnect();
                component = "login";
            }
        }

        this.setState({component: component});
    }

    render () {
        return <div>
            <Redirect to={"/" + this.state.component}/>
        </div>
    }
}

export default Home;