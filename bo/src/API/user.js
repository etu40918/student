import axios from 'axios';

import {getAPI, getHeaders} from "./utils";

const URL_ROLEUSER = getAPI("user/role");
const URL_USER = getAPI("user");

const getRole = async (token) => {
    try {
        const resp = await axios.get(URL_ROLEUSER,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        return resp.data.role;
    } catch(e){
        throw new Error("Error while loading role!");
    }
}

const getUsers = async () => {
    try {
        const resp = await axios.get(URL_USER, {headers: getHeaders()});
        return resp.data;
    } catch(e){
        throw new Error("Error while loading users");
    }
}

const deleteUser = async (email) => {
    try {
        await axios.delete(URL_USER, {
            headers: getHeaders(),
            data: {
                email: email
            }
        })
    } catch(e){
        throw new Error("Error deleting user !");
    }
}

export {getRole, getUsers, deleteUser};