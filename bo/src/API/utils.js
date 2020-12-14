const URL = "http://localhost:3001";

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {'Authorization': 'Bearer ' + token}
}

const getAPI = (access) => {
    return URL + "/" + access;
}

export {getHeaders, getAPI};