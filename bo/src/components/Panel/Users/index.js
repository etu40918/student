import React from "react";

import {getUsers, deleteUser, editUser} from "../../../API/user";

import "./Users.css";
import {confirmAlert} from "react-confirm-alert";
import {getOptions, getSchools} from "../../../API/school";

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usersDisplay: [],
            editedUser: "",
            editedUserSchool: null,
            editedUserOption: null,
            schools: null,
            options: null
        }
    }

    async componentDidMount() {
        const results = await getUsers();

        const schools = await getSchools();
        this.setState({
            users: results,
            usersDisplay: results,
            schools: schools
        });
    }

    async componentDidUpdate(prevProps, prevState){
        const schools = await getSchools();
        if(prevState.schools !== schools)
            this.setState({schools: schools});

        if(this.state.editedUserSchool !== prevState.editedUserSchool){
            if(this.state.editedUserSchool !== null) {
                const options = await getOptions(this.state.editedUserSchool);
                this.setState({options: options});
            } else {
                this.setState({options: null});
            }
        }
    }

    search(e){
        let searchValue = e.target.value.toLowerCase();
        if(searchValue === ""){
            let usersDisplay = this.state.users;
            this.setState({usersDisplay: usersDisplay});
        } else {
            let users = this.state.users;
            let filteredUsers = users.filter((user) => {
                return user.email.toLowerCase().includes(searchValue)
                    || user.firstname.toLowerCase().includes(searchValue)
                    || user.lastname.toLowerCase().includes(searchValue);
            });
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

    editUser(email, option, school){
        this.setState({
            editedUser: email,
            editedUserSchool: school,
            editedUserOption: option
        });
    }

    getSchoolSelect(){
        let schools = this.state.schools;
        let selected = this.state.editedUserSchool !== null ? this.state.editedUserSchool : 'null';
        return(<select onChange={(e) => this.setState(e.target.value === 'null' ? {editedUserSchool: null} : {editedUserSchool: e.target.value})} value={selected} name="school" id="schoolSelectInput">
            <option value="null">No school</option>
            {schools.map((school, index) => {
                return (<option key={index} value={school.id}>{school.name}</option>)
            })}
        </select>);
    }

    getOptionSelect(){
        let options = this.state.options;
        let selected = this.state.editedUserOption !== null ? this.state.editedUserOption : 'null';
        return(<select onChange={(e) => this.setState(e.target.value === 'null' ? {editedUserOption: null} : {editedUserOption: e.target.value})} value={selected} name="option" id="optionSelectInput">
            <option value="null">No option</option>
            {options != null && options.map((option, index) => {
                return (<option key={index} value={option.name}>{option.name}</option>)
            })}
        </select>);
    }

    tabData() {
        let users = this.state.usersDisplay;

        return users.map((user, index) => {
            const {email, lastname, firstname, birthday, bloc, optionname, schoolid, schoolname} = user;

            let alt = (index % 2) === 1 ? "alt" : "";

            if(email === this.state.editedUser){

                let schoolSelect = this.getSchoolSelect();
                let optionSelect = this.getOptionSelect();

                return (<tr className="newRow" key={index}>
                    <td>{email}</td>
                    <td><input id="userFirstNameInput" type="text" defaultValue={firstname} placeholder="firstname"/></td>
                    <td><input id="userLastNameInput" type="text" defaultValue={lastname} placeholder="lastname"/></td>
                    <td>{birthday}</td>
                    <td>{schoolSelect}</td>
                    <td>{optionSelect}</td>
                    <td><input id="userBlocInput" type="number" defaultValue={bloc} placeholder="bloc"/></td>
                    <td colSpan={2}/>
                </tr>);
            }

            return (
                <tr className={alt} key={index}>
                    <td>{email}</td>
                    <td>{firstname}</td>
                    <td>{lastname}</td>
                    <td>{birthday}</td>
                    <td>{schoolname}</td>
                    <td>{optionname}</td>
                    <td>{bloc}</td>
                    <td><button onClick={() => this.editUser(email, optionname, schoolid)} className="editButton">✏</button></td>
                    <td><button onClick={(e) => this.confirmDelete(e, email)} className="deleteButton">🗑</button></td>
                </tr>
            );
        });
    }

    closeSaveCancelTd(){
        this.setState({
            editedUser: "",
            editedUserSchool: null,
            editedUserOption: null
        });
    }

    async verifyUser() {
        let userFirstName = document.getElementById("userFirstNameInput");
        let userLastName = document.getElementById("userLastNameInput");

        let userOption = document.getElementById("optionSelectInput");
        let userBloc = document.getElementById("userBlocInput");

        let error = false;

        error = error ? true : this.verifyField(userFirstName, "", 30);
        error = error ? true : this.verifyField(userLastName, "", 30);

        if(this.state.editedUserSchool !== null){
            let errorOption = false;
            userOption.classList.remove("errorInput");
            if(this.state.editedUserOption !== null){
                let nbYearsMax = 0;
                for(let option of this.state.options){
                    if(option.name === this.state.editedUserOption)
                        nbYearsMax = option.nbyears;
                }
                let errorBloc = false;
                if(userBloc.value === "" || parseInt(userBloc.value) < 1 || parseInt(userBloc.value) > nbYearsMax){
                    errorBloc = true;
                    userBloc.classList.add("errorInput");
                } else {
                    userBloc.classList.remove("errorInput");
                }
                error = error ? true : errorBloc;
            } else {
                errorOption = true;
                userOption.classList.add("errorInput");
                userBloc.value = "";
            }
            error = error ? true : errorOption;
        } else {
            userBloc.value = "";
        }

        if(!error){
            let bloc = this.state.editedUserSchool === null || userBloc.value === "" ? null : parseInt(userBloc.value);
            await editUser(this.state.editedUser, userLastName.value, userFirstName.value, this.state.editedUserSchool, this.state.editedUserOption, bloc)

            this.closeSaveCancelTd();
            const results = await getUsers();

            this.setState({
                users: results,
                usersDisplay: results
            });
        }
    }

    verifyField(field, verification, maxLength) {
        let error = false;
        if (field.value === verification || field.value.length > maxLength){
            error = true;
            field.classList.add("errorInput");
        } else {
            field.classList.remove("errorInput");
        }
        return error;
    }


    render(){

        let lastTd =  null;
        if(this.state.editedUser !== "")
            lastTd = (<tr>
            <td colSpan={9} className="lastTd">
                <button className="saveNew" onClick={() => this.verifyUser()}>SAVE</button>
                <button className="cancelNew" onClick={() => this.closeSaveCancelTd()}>CANCEL</button>
            </td>
        </tr>);
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
                    <tr><th>Email</th><th>Firstname</th><th>Lastname</th><th>Birthday</th><th>School</th><th>Option</th><th>Bloc</th><th>Edit</th><th>Delete</th></tr>
                    </thead>
                    <tbody>
                    {this.tabData()}
                    {lastTd}
                    </tbody>
                </table>
            </div>
        </div>
    }
}

export default Users;