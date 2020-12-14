import React from "react";

import {disconnect} from "../../API/login";
import "./AccessDenied.css";

class AccessDenied extends React.Component {

    componentDidMount() {
        if(localStorage.getItem("token") === null){
            this.props.history.push("/");
        }
    }

    disconnect(e){
        e.preventDefault();
        disconnect();
        this.props.history.push("/");
    }

    render() {
        return <div id="divDenied">
            <h1>ACCESS DENIED</h1>
            <p>⚠️ You don't have permissions to reach there !</p>
            <button id="buttonDisconnect" onClick={(e) => this.disconnect(e)}>Logout</button>
        </div>
    }
}

export default AccessDenied;