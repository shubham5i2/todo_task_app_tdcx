
import React,{props} from 'react';
import { get, put, post } from "superagent";
export default class Lists extends React.Component {
    constructor(){
        super(props);
        this.addNewTask = this.addNewTask.bind();
    }
    componentDidMount(){
        get("http://localhost:4000/tasks").then((resp)=>{
            console.log(resp.body);
        })
    }
    addNewTask() {
        post("http://localhost:4000/tasks").then((res)=>{
            console.log(res);
        })
    }
    render(){
        const {tasks} = this.props;
        return (
            <div>
                Task Detailas as follows,{tasks}

                <button onClick={this.addNewTask}>
                    Add New Task
                </button>
            </div>
        )
    }
}