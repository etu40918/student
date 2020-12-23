import React from "react";

import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

import {getPublications, deleteReports, deletePublication} from "../../../API/publication";
import "./style.css";

import Comment from "../Publications/Comment";

class Publication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publications: [],
            viewReports: false,
            selectedPublication: -1
        }
    }

    async componentDidMount() {
        const results = await getPublications();
        this.setState({
            publications: results
        });
    }

    async switchReportButton(e) {
        const results = await getPublications(e.target.checked);
        this.setState({
            publications: results,
            viewReports: e.target.checked
        });
    }

    async deleteReports(id){
        await deleteReports(id);

        const results = await getPublications(this.state.viewReports);
        this.setState({
            publications: results,
        });
    }

    async deletePublication(id) {
        await deletePublication(id);
        const results = await getPublications(this.state.viewReports);
        this.setState({
            publications: results
        });
    }

    confirmDeleteReports(e, id){
        e.preventDefault();
        confirmAlert({
            title: 'Delete reports',
            message: 'Do you really want to delete reports from this publication ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => await this.deleteReports(id)
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    confirmDeletePublication(e, id) {
        e.preventDefault();
        confirmAlert({
            title: 'Delete Publication',
            message: 'Do you really want to delete this publication ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => await this.deletePublication(id)
                },
                {
                    label: 'No'
                }
            ]
        })
    }

    selectPublication(id) {
        this.setState({selectedPublication: id});
    }

    tabData() {
        let publications = this.state.publications;

        return publications.map((publication, index) => {
            const {id, content, date, user, nbreports} = publication;
            let alt = (index % 2) === 1 ? "alt" : "";
            return (
                <tr key={index}>
                    <td className={alt}>{user}</td>
                    <td className={alt}>{content}</td>
                    <td className={alt}>{date}</td>
                    <td className={alt}>{nbreports}</td>
                    <td className={alt}>
                        <button className="optionsButton" onClick={() => this.selectPublication(id)}>🗒</button>
                    </td>
                    <td className={alt}>
                        <button className="removeReportsButton" onClick={async(e) => await this.confirmDeleteReports(e, id)}>✏</button>
                    </td>
                    <td className={alt}>
                        <button className="deleteButton" onClick={async(e) => await this.confirmDeletePublication(e, id)}>🗑</button>
                    </td>
                </tr>
            );
        });
    }

    render() {

        let comments = null;
        if(this.state.selectedPublication !== -1)
            comments = <Comment publiID={this.state.selectedPublication}/>;

        return <div id="publications">
            <p id="publicationsTitle">PUBLICATIONS</p>

            <label className="form-switch">
                <input onChange={async (e) => await this.switchReportButton(e)} type="checkbox"/>
                <i/>
            </label>

            <p id="viewReported">Reported : </p>
            <div className="tableWrapper">
                <table>
                    <thead>
                    <tr><th>Email user</th><th>Content</th><th>Date</th><th>Reports</th><th>View comments</th><th>Remove reports</th><th>Delete</th></tr>
                    </thead>
                    <tbody>
                        {this.tabData()}
                    </tbody>
                </table>
            </div>
            {comments}
        </div>
    }
}

export default Publication;