import React from "react";

import {disconnect} from "../../API/login";
import {getRole} from "../../API/user";

import Schools from "./Schools";
import Menu from "./Menu";
import Users from "./Users";
import Publications from "./Publications";

import "./Panel.css";

class Panel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMenu: "schools",
            currentElem: null
        }

    }

    disconnect = (e) => {
        e.preventDefault();
        disconnect();
        this.props.history.push("/");
    }

    selectMenu = (menu, elem) => {
        if(this.state.currentElem !== null){
            this.state.currentElem.classList.remove("active");
        } else {
            document.getElementById("defaultMenu").classList.remove("active");
        }

        elem.classList.add("active");

        this.setState({currentMenu: menu, currentElem: elem});
    }

    async componentDidMount() {
        if(localStorage.getItem("token") === null){
            this.props.history.push("/");
        } else {
            try {
                let role = await getRole(localStorage.getItem("token"));
                if(role === "user"){
                    this.props.history.push("/accessDenied");
                } else {
                    this.setState({role: role});
                }
            } catch (e){
                disconnect();
                this.props.history.push("/");
            }
        }
    }

    render () {
        let menuToDisplay;
        switch (this.state.currentMenu) {
            case "schools" :
                menuToDisplay = <Schools/>;
                break;
            case "users" :
                menuToDisplay = <Users/>;
                break;
            case "publications" :
                menuToDisplay = <Publications/>;
                break;
            default:
                menuToDisplay = <Schools/>;
        }

        return <div id="panel">
            <Menu selectMenu={this.selectMenu} disconnect={this.disconnect}/>

            {menuToDisplay}
        </div>
    }
}

export default Panel;