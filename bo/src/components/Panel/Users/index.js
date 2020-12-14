import React from "react";

import {getUsers, deleteUser} from "../../../API/user";

import "./Users.css";
import {confirmAlert} from "react-confirm-alert";

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usersDisplay: []
        }
    }

    async componentDidMount() {
        const results = await getUsers();
        this.setState({
            users: results,
            usersDisplay: results
        });
    }

    search(e){
        let searchValue = e.target.value;
        if(searchValue === ""){
            let usersDisplay = this.state.users;
            this.setState({usersDisplay: usersDisplay});
        } else {
            let users = this.state.users;
            let filteredUsers = users.filter((user) => {
                return user.email.toLowerCase().includes(searchValue)
                    || user.firstname.toLowerCase().includes(searchValue)
                    || user.lastname.toLowerCase().includes(searchValue);
            })
            this.setState({usersDisplay: filteredUsers});
        }
    }

    async deleteUser(email) {
        await deleteUser(email);
        const results = await getUsers();
        this.setState({
            users: results,
            usersDisplay: results
        });
    }

    confirmDelete(e, email) {
        e.preventDefault();
        confirmAlert({
            title: 'Delete user',
            message: 'Do u really want to delete this user ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => await this.deleteUser(email)
                },
                {
                    label: 'No'
                }
            ]
        });
    }


    tabData() {
        let users = this.state.usersDisplay;

        return users.map((user, index) => {
            const {email, firstname, lastname, birthday} = user;

            let alt = (index % 2) === 1 ? "alt" : "";

            return (
                <tr key={index}>
                    <td className={alt}>{email}</td>
                    <td className={alt}>{firstname}</td>
                    <td className={alt}>{lastname}</td>
                    <td className={alt}>{birthday}</td>
                    <td className={alt}><button className="editButton">✏</button></td>
                    <td className={alt}><button onClick={(e) => this.confirmDelete(e, email)} className="deleteButton">🗑</button></td>
                </tr>
            );
        });
    }

    render(){
        return <div id="users">
            <p id="userTitle">USERS</p>

            <form className="searchBox">
                <input className="searchInput" type="text" name="" placeholder="Search" onChange={(e) => this.search(e)}/>
                <button className="searchButton" onClick={(e) => e.preventDefault()}>
                    <i className="fa fa-search"/>
                </button>
            </form>
            <div className="tableWrapper">
                <table>
                    <thead>
                    <tr><th>Email</th><th>Firstname</th><th>Lastname</th><th>Birthday</th><th>Edit</th><th>Delete</th></tr>
                    </thead>
                    <tbody>
                    {this.tabData()}
                    </tbody>
                </table>
            </div>
        </div>
    }
}

export default Users;