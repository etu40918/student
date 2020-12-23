import axios from "axios";
import {getHeaders, getAPI} from "./utils";

const PUBLICATION_URL = getAPI("publication");

const REPORTS_URL = getAPI("publication/reports");

const COMMENTS_URL = getAPI("publication/comments");

const getPublications = async (orderByReports = false) => {
    try {
        const resp = await axios.post(PUBLICATION_URL, {
            orderByReports: orderByReports
        }, {headers: getHeaders()});
        return resp.data;
    } catch (e) {
        alert("Error loading publications");
    }
}

const deleteReports = async (publiID) => {
    try {
       await axios.delete(REPORTS_URL, {
            headers: getHeaders(),
            data: {
                publiID: publiID
            }
        });
    } catch(e) {
        alert("Error while deleting reports");
    }
}

const deletePublication = async(id) => {
    try {
        await axios.delete(PUBLICATION_URL, {
            headers: getHeaders(),
            data: {
                id: id
            }
        });
    } catch(e) {
        alert("Error while deleting publication");
    }
}

const getComments = async (publiID) => {
    try {
        const resp = await axios.post(COMMENTS_URL, {
            publiID: publiID
        }, {headers: getHeaders()});
        return resp.data;
    } catch (e){
        alert("Error loading comments");
    }
}

const deleteComment = async(id) => {
    try {
        await axios.delete(COMMENTS_URL, {
            headers: getHeaders(),
            data : {
                id: id
            }
        });
    } catch(e) {
        alert("Error while deleting comment !");
    }
}
export {getPublications, deleteReports, deletePublication, getComments, deleteComment};