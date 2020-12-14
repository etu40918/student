import React from "react";

import {getComments, deleteComment} from "../../../../API/publication";
import {confirmAlert} from "react-confirm-alert";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            publiID: props.publiID
        }
    }
    async componentDidMount() {
        let comments = await getComments(this.props.publiID);
        this.setState({comments: comments});
    }

    async componentDidUpdate(prevProps) {
        if(prevProps.publiID !== this.props.publiID) {
            let comments = await getComments(this.props.publiID);
            this.setState({publiID: this.props.publiID, comments: comments});
        }
    }

    confirmDeleteComment(e, id) {
        e.preventDefault();
        confirmAlert({
            title: 'Delete comment',
            message: 'Do you really want to delete this comment ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => await this.deleteComment(id)
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    async deleteComment(id){
        await deleteComment(id);

        const results = await getComments(this.props.publiID);
        this.setState({
            comments: results,
        });
    }


    commentsTab() {
        let comments = this.state.comments;

        return comments.map((comment, index) => {
            const {id, content, user, date} = comment;
            let alt = (index % 2) === 1 ? "alt" : "";
            return (
                <tr key={index}>
                    <td className={alt}>{content}</td>
                    <td className={alt}>{user}</td>
                    <td className={alt}>{date}</td>
                    <td className={alt}><button className="deleteButton" onClick={(e) => this.confirmDeleteComment(e, id)}>🗑</button></td>
                </tr>
            );
        });
    }

    render() {
        return <div id="comments" key={this.props.publiID}>
            <p className="schoolTitle">COMMENTS</p>
            <div className="tableWrapper">
                <table>
                    <thead>
                    <tr><th>Content</th><th>User</th><th>Date</th><th>Delete</th></tr>
                    </thead>
                    <tbody>
                    {this.commentsTab()}
                    </tbody>
                </table>
            </div>
        </div>
    }
}

export default Comment;
