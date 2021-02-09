import * as React from "react";
import * as PropTypes from "prop-types";


export default class CenterView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formErrors: {},
            id:"",
            name:""
        }
        this.logIn = this.logIn.bind(this);
        this.updateValues = this.updateValues.bind(this);
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
        const {formErrors} = this.state;
        return (
            <div className="card-view">
                {
                    displayType === 'no-tasks' && <>
                        <p>No Task Exists</p>
                        <button>New Task</button>
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
                        <button onClick={this.logIn}>Submit</button>
                    </>
                }
            </div>
        )
    }
}