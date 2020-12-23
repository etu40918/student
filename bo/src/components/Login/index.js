import React from "react";
import "./Login.css"

import {connect} from "../../API/login";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            error: false,
            errorMessage: "",
            loaded: false
        };
    }

    connect(e){
        e.preventDefault();
        this.setState({error: false, token: ""}, async() => {
            try {
                await connect(this.state.login, this.state.password);
                this.props.history.push("/");
            } catch(e) {
                this.setState({
                    error: true,
                    errorMessage: e.message,
                    loaded: true
                })
            }
        });
    }

    switchPassword(){
        let element = document.getElementById("password");
        if(element.type === "text"){
            element.type = "password";
        } else {
            element.type = "text";
        }
    }

    componentDidMount() {
        if(localStorage.getItem("token") !== null){
            this.props.history.push("/");
        }
    }

    render() {
        let Error = null;

        if(this.state.error) {
            Error = <p id="error">{this.state.errorMessage}</p>;
        }

        return <form id="loginForm">
            <h1>Student</h1>

            <div className="icon_input">
                <i className="fa fa-user icon"/>
                <input type="text"
                       id="username"
                       name="username"
                       onChange={
                           (e) => this.setState({login: e.target.value})
                       }
                       required
                       className="loginFormInput"
                       placeholder="Username"
                />
            </div>

            <div className="icon_input">
                <i className="fa fa-key icon" onClick={() => this.switchPassword()}/>
                <input type="password"
                       id="password"
                       name="password"
                       onChange={
                           (e) => this.setState({password: e.target.value})
                       }
                       required
                       className="loginFormInput"
                       placeholder="Password"
                />
            </div>
            <input type="submit" name="login" value="Login" onClick={(e) => this.connect(e)}/>
            {Error}
        </form>
    }
}

export default Login;