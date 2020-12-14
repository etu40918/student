import React from "react";

import {getOptions, deleteOption, insertOption, editOption} from "../../../../API/school";
import {confirmAlert} from "react-confirm-alert";
import "./style.css";

class Options extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            schoolId: props.schoolId,
            newOption: false,
            editedOption: ""
        }
    }

    async componentDidMount() {
        let options = await getOptions(this.props.schoolId);
        this.setState({options: options});
    }

    async componentDidUpdate(prevProps) {
        if(prevProps.schoolId !== this.props.schoolId) {
            let options = await getOptions(this.props.schoolId);
            this.setState({schoolId: this.props.schoolId, options: options});
        }
    }

    async deleteOption(name, schoolId){
        await deleteOption(name, schoolId);

        let options = await getOptions(this.props.schoolId);
        this.setState({options: options});
    }

    async confirmDeleteOption(e, name, schoolId){
        e.preventDefault();

        confirmAlert({
            title: 'Delete option',
            message: 'Do you really want to delete this option ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => await this.deleteOption(name, schoolId)
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    createNewOption() {
        let tableWrapper = document.getElementById("optionTableWrapper")
        tableWrapper.scrollTop = 0;

        this.setState({
            newOption: true
        })
    }

    async verifyNewOption(type) {
        let optionName = document.getElementById("optionNameInput");
        let optionNbYears = document.getElementById("optionNbYearsInput");
        let error = false;

        error = error ? true : this.verifyField(optionName, "", 50);
        error = error ? true : this.verifyField(optionNbYears, "", 1);

        if(!error) {
            if(type === "new")
                await insertOption(optionName.value, optionNbYears.value, this.state.schoolId);
            else
                await editOption(this.state.editedOption, this.state.schoolId, optionName.value, optionNbYears.value);

            this.closeSaveCancelTd();
            const results = await getOptions(this.props.schoolId);
            this.setState({
                options: results
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

    editOption(name){
        this.setState({
            editedOption: name
        });
    }

    closeSaveCancelTd(){
        this.setState({
            newOption: false,
            editedOption: ""
        });
    }

    optionsTab() {
        let options = this.state.options;

        return options.map((option, index) => {
            const {name, nbyears} = option;
            let alt = (index % 2) === 1 ? "alt" : "";

            if(name === this.state.editedOption){
                return (<tr className="newRow" key={index}>
                    <td><input id="optionNameInput" type="text" placeholder="name" defaultValue={name}/></td>
                    <td><input id="optionNbYearsInput" type="number" placeholder="nb years" defaultValue={nbyears}/></td>
                    <td colSpan={2}/>
                </tr>);
            }

            return (
                <tr key={index}>
                    <td className={alt}>{name}</td>
                    <td className={alt}>{nbyears}</td>
                    <td className={alt}><button onClick={() => this.editOption(name)} className="editButton">✏</button></td>
                    <td className={alt}><button onClick={(e) => this.confirmDeleteOption(e, name, this.state.schoolId)} className="deleteButton">🗑</button></td>
                </tr>
            );
        });
    }

    render(){
        let lastTd;
        let newOptionRow = null;
        if(!this.state.newOption && this.state.editedOption === "") {
            lastTd = (<tr>
                <td colSpan={4} className="lastTd">
                    <button className="addButton" onClick={() => this.createNewOption()}>NEW OPTION</button>
                </td>
            </tr>);
        } else {
            if(this.state.newOption) {
                newOptionRow = (<tr className="newRow">
                    <td><input id="optionNameInput" type="text" placeholder="name"/></td>
                    <td><input id="optionNbYearsInput" type="number" placeholder="nb years"/></td>
                    <td colSpan={2}/>
                </tr>);
            }
            lastTd = (<tr>
                <td colSpan={4} className="lastTd">
                    <button className="saveNew" onClick={() => this.verifyNewOption(this.state.newOption ? "new" : "edit")}>SAVE</button>
                    <button className="cancelNew" onClick={() => this.closeSaveCancelTd()}>CANCEL</button>
                </td>
            </tr>);
        }
        return <div id="options" key={this.props.schoolId}>
            <p className="schoolTitle">OPTIONS</p>
            <div id="optionTableWrapper" className="tableWrapper">
                <table>
                    <thead>
                        <tr><th>Name</th><th>Years</th><th>Edit</th><th>Delete</th></tr>
                    </thead>
                    <tbody>
                    {newOptionRow}
                    {this.optionsTab()}
                    {lastTd}
                    </tbody>
                </table>
            </div>
        </div>
    }
}

export default Options;