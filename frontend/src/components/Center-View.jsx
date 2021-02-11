import * as React from "react";
import * as PropTypes from "prop-types";
import '../stylesheets/CenterView.css'

export default class CenterView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formErrors: {},
            id:"",
            name:"",
            taskname:"",
            isAddTask:false
        }
        this.logIn = this.logIn.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.addTask = this.addTask.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
    }
    addTask(){
        this.setState({
            isAddTask: true
        })
    }
    addNewTask(){
        this.props.addNewTask(this.state.taskname);
    }
    updateValues(prop,value){
        if(prop === 'id') {
            this.setState({
                id:value
            })
        }
        else if(prop === 'name'){
            this.setState({
                name:value
            })
        }
        else if(prop === "task-name"){
            this.setState({
                taskname: value
            })
        }
    }
    logIn() {
        if(this.state.id.length === 0 || this.state.name.length === 0) {
            this.setState({
                formErrors:{msg:'Please fill both id and name to login'}
            })
        }
        else {
            this.setState({
                formErrors:{}
            })
            this.props.login(this.state.id,this.state.name);
        }
    }
    render(){
        const {displayType} = this.props;
        const {formErrors,isAddTask} = this.state;
        console.log(displayType);
        return (
            <div className="card-view">
                {
                    !isAddTask && displayType === 'no-tasks' && <>
                        <p>No Task Exists</p>
                        <button className={"loginButton"} onClick={this.addTask}>Add Task</button>
                    </>
                }
                {
                    displayType === 'display-tasks' && <>
                        <p>Here are the tasks</p>
                    </>
                }
                {
                    displayType === 'login' && <>
                        <p>Login Form</p>
                        <input
                            id={"loginId"}
                            className="userid"
                            type={"text"}
                            placeholder={"ID"}
                            //title={typeof input.validationErrorMessage === 'undefined' ? message + key : (this.state[key].value?input.validationErrorMessage:"")}
                            onChange={(evt) => {
                                this.updateValues("id",evt.target.value);
                            }}
                        />
                        <input
                            id={"username"}
                            className="username"
                            type={"text"}
                            placeholder={"Name"}
                            //title={typeof input.validationErrorMessage === 'undefined' ? message + key : (this.state[key].value?input.validationErrorMessage:"")}
                            onChange={(evt) => {
                                this.updateValues("name",evt.target.value);
                            }}
                        />
                        <br/>
                        {this.state.formErrors && this.state.formErrors.msg ? <><span>{this.state.formErrors.msg}</span><br/></> : ''}
                        <button className={"loginButton"} onClick={this.logIn}>Submit</button>
                    </>
                }
                {
                    isAddTask && <>
                    <p>Add New Task</p>
                        <input
                            id={"task-name"}
                            className="taskname"
                            type={"text"}
                            placeholder={"Task"}
                            //title={typeof input.validationErrorMessage === 'undefined' ? message + key : (this.state[key].value?input.validationErrorMessage:"")}
                            onChange={(evt) => {
                                this.updateValues("task-name",evt.target.value);
                            }}
                        />
                        <br/>
                        <button className={"loginButton"} onClick={this.addNewTask}>Add</button>
                    </>
                }
            </div>
        )
    }
}