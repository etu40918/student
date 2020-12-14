import React from "react";

import {getSchools, insertSchool, deleteSchool, editSchool} from "../../../API/school";

import "./Schools.css";

import Options from "./Options";

import {confirmAlert} from "react-confirm-alert";

class Schools extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schools: [],
            schoolsDisplay: [],
            selectedSchool: -1,
            newSchool: false,
            editedSchool: -1
        }
    }

    async componentDidMount() {
        const results = await getSchools();
        this.setState({
            schools: results,
            schoolsDisplay: results
        });
    }

    search(e){
        let searchValue = e.target.value;
        if(searchValue === ""){
            let schoolsDisplay = this.state.schools;
            this.setState({schoolsDisplay: schoolsDisplay});
        } else {
            let schools = this.state.schools;
            let filteredSchools = schools.filter((school) => {
                return school.address.toLowerCase().includes(searchValue)
                    || school.name.toLowerCase().includes(searchValue);
            })
            this.setState({schoolsDisplay: filteredSchools});
        }
    }

    selectSchool(schoolId) {
        this.setState({
            selectedSchool: schoolId
        });
    }

    async deleteSchool(id) {
        await deleteSchool(id);
        const results = await getSchools();
        this.setState({
            schools: results,
            schoolsDisplay: results
        });
    }

    confirmDeleteSchool(e, id){
        e.preventDefault();
        confirmAlert({
            title: 'Delete school',
            message: 'Do you really want to delete this school ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => await this.deleteSchool(id)
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    schoolsTab() {
        let schools = this.state.schoolsDisplay;

        return schools.map((school, index) => {
            const {id, name, address, phonenumber} = school;
            let alt = (index % 2) === 1 ? "alt" : "";

            if(id === this.state.editedSchool){
                return (<tr className="newRow" key={index}>
                    <td><input id="schoolNameInput" type="text" defaultValue={name} placeholder="name"/></td>
                    <td><input id="schoolAddressInput" type="text" defaultValue={address} placeholder="address"/></td>
                    <td><input id="schoolPhoneNumberInput" type="text" defaultValue={phonenumber} placeholder="phonenumber"/></td>
                    <td colSpan={3}/>
                </tr>);
            }

            return (
                <tr className={alt} key={index}>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{phonenumber}</td>
                    <td><button className="optionsButton" onClick={() => this.selectSchool(id)}>🗒</button></td>
                    <td><button className="editButton" onClick={() => this.editSchool(id)}>✏</button></td>
                    <td><button className="deleteButton" onClick={(e) => this.confirmDeleteSchool(e, id)}>🗑</button></td>
                </tr>
            );
        });
    }

    editSchool(id){
        this.setState({
            editedSchool: id
        });
    }

    closeSaveCancelTd(){
        this.setState({
            newSchool: false,
            editedSchool: -1
        });
    }

    createNewSchool() {
        let tableWrapper = document.getElementById("schoolTableWrapper")
        tableWrapper.scrollTop = 0;

        this.setState({
            newSchool: true
        })
    }

    async verifySchool(type) {
        let schoolName = document.getElementById("schoolNameInput");
        let schoolAddress = document.getElementById("schoolAddressInput");
        let schoolPhoneNumber = document.getElementById("schoolPhoneNumberInput");
        let error = false;

        error = error ? true : this.verifyField(schoolName, "", 50);
        error = error ? true : this.verifyField(schoolAddress, "", 100);
        error = error ? true : this.verifyField(schoolPhoneNumber, "", 12);

        if(!error) {
            if(type === "new")
                await insertSchool(schoolName.value, schoolAddress.value, schoolPhoneNumber.value);
            else {
                await editSchool(this.state.editedSchool, schoolName.value, schoolAddress.value, schoolPhoneNumber.value);
            }

            this.closeSaveCancelTd();
            const results = await getSchools();
            this.setState({
                schools: results,
                schoolsDisplay: results
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
        let options = null;
        if(this.state.selectedSchool !== -1)
            options = <Options createNewOption={this.createNewOption} schoolId={this.state.selectedSchool}/>;

        let newSchoolRow = null;

        let lastTd;
        if(!this.state.newSchool && this.state.editedSchool === -1)
            lastTd = (<tr>
                <td colSpan={6} className="lastTd">
                    <button className="addButton" onClick={() => this.createNewSchool()}>NEW SCHOOL</button>
                </td>
            </tr>);
        else {
            if(this.state.newSchool) {
                newSchoolRow = (<tr className="newRow">
                    <td><input id="schoolNameInput" type="text" placeholder="name"/></td>
                    <td><input id="schoolAddressInput" type="text" placeholder="address"/></td>
                    <td><input id="schoolPhoneNumberInput" type="text" placeholder="phonenumber"/></td>
                    <td colSpan={3}/>
                </tr>);
            }
            lastTd = (<tr>
                <td colSpan={6} className="lastTd">
                    <button className="saveNew" onClick={() => this.verifySchool(this.state.newSchool ? "new" : "edit")}>SAVE</button>
                    <button className="cancelNew" onClick={() => this.closeSaveCancelTd()}>CANCEL</button>
                </td>
            </tr>);
        }
        return <div id="schools">
            <p className="schoolTitle">SCHOOLS</p>

            <form className="searchBox">
                <input className="searchInput" type="text" name="" placeholder="Search" onChange={(e) => this.search(e)}/>
                <button className="searchButton" onClick={(e) => e.preventDefault()}>
                    <i className="fa fa-search"/>
                </button>
            </form>
            <div id="schoolTableWrapper" className="tableWrapper">
                <table className="scroll-table">
                    <thead>
                    <tr><th>Name</th><th>Address</th><th>Phone number</th><th>Options</th><th>Edit</th><th>Delete</th></tr>
                    </thead>
                    <tbody>
                        {newSchoolRow}
                        {this.schoolsTab()}
                        {lastTd}
                    </tbody>
                </table>
            </div>
            {options}
        </div>
    }
}

export default Schools;