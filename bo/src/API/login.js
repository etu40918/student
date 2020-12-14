import axios from 'axios';

import {getAPI} from "./utils";

const URL_LOGIN = getAPI("login");

const connect = async (email, password) => {
    if(email !== undefined && password !== undefined){
        try {
            const resp = await axios.post(URL_LOGIN,
                {
                    email,
                    password
                });
            localStorage.setItem("token", resp.data);
        } catch(e){
            throw new Error("Login or password incorrect !");
        }
    } else {
        throw new Error("You need to enter a login and a password !");
    }
}

const disconnect = () => {
    window.localStorage.removeItem("token");
}

export {connect, disconnect};