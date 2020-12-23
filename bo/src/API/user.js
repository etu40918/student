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
        alert("Error while loading role!");
    }
}

const getUsers = async () => {
    try {
        const resp = await axios.get(URL_USER, {headers: getHeaders()});
        return resp.data;
    } catch(e){
        alert("Error while loading users");
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
        alert("Error deleting user !");
    }
}

const editUser = async (email, lastName, firstName, schoolId, optionName, bloc) => {
    try {
        await axios.patch(URL_USER, {
            email: email,
            lastName: lastName,
            firstName: firstName,
            schoolId: schoolId,
            optionName: optionName,
            bloc: bloc
        }, {
            headers: getHeaders()
        });
    } catch (e){
        alert("Error editing user !");
    }
}

export {getRole, getUsers, deleteUser, editUser};