import React from "react";

import "./menu.css";

class Menu extends React.Component {

    render() {
        return <div id="menu">
            <p className="menuTitle">STUDENT</p>
            <ul>
                <li id="defaultMenu" className="active" onClick={(e) => this.props.selectMenu("schools", e.target)}>Schools</li>
                <li onClick={(e) => this.props.selectMenu("users", e.target)}>Users</li>
                <li onClick={(e) => this.props.selectMenu("publications", e.target)}>Publications</li>
                <li className="logout" onClick={(e) => this.props.disconnect(e)}>Logout</li>
            </ul>
        </div>
    }

}

export default Menu;