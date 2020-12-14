import axios from "axios";
import {getHeaders, getAPI} from "./utils";

const SCHOOL_URL = getAPI("school");
const OPTIONS_URL = getAPI("school/options");
const OPTION_URL = getAPI("school/option");

const getSchools = async () => {
    try {
        const resp = await axios.get(SCHOOL_URL, {headers: getHeaders()});
        return resp.data;
    } catch (e) {
        throw new Error("Error loading schools");
    }
}

const getOptions = async (schoolId) => {
    try {
        const resp = await axios.post(OPTIONS_URL, {
            schoolId: schoolId
        }, {headers: getHeaders()});
        return resp.data;
    } catch (e){
        throw new Error("Error loading options")
    }
}

const deleteSchool = async(id) => {
    try {
        await axios.delete(SCHOOL_URL, {
            headers: getHeaders(),
            data: {
                id: id
            }
        });
    } catch(e) {
        throw new Error("Error while deleting school");
    }
}

const deleteOption = async(name, schoolId) => {
    try {
        await axios.delete(OPTION_URL, {
            headers: getHeaders(),
            data: {
                name: name,
                school: schoolId
            }
        });
    } catch(e) {
        throw new Error("Error while deleting option");
    }
}

const insertOption = async (name, nbYears, schoolId) => {
    try {
        await axios.post(OPTION_URL, {
            name: name,
            nbyears: nbYears,
            school: schoolId
        });
    } catch(e) {
        throw new Error("Error when inserting the new option");
    }
}
const editSchool = async(schoolId, name, address, phonenumber) => {
    try {
        await axios.patch(SCHOOL_URL,
            {
                schoolId: schoolId,
                name: name,
                address: address,
                phoneNumber: phonenumber
            }, {headers: getHeaders()
        });
    } catch(e) {
        throw new Error("Error editing school");
    }
}

const insertSchool = async (name, address, phonenumber) => {
    try {
        await axios.post(SCHOOL_URL, {
            name: name,
            address: address,
            phonenumber: phonenumber
        }, {
            headers: getHeaders()
        });
    } catch(e) {
        throw new Error("Error when inserting the new school");
    }
}

const editOption = async(lastName, schoolId, name, nbYears) => {
    try {
        await axios.patch(OPTION_URL,
            {
                lastName: lastName,
                schoolId: schoolId,
                name: name,
                nbYears: nbYears
            }, {headers: getHeaders()
            });
    } catch(e) {
        throw new Error("Error editing option");
    }
}

export {getSchools, insertSchool, deleteSchool, editSchool, getOptions, insertOption, editOption, deleteOption};