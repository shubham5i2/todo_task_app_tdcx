
import React,{props} from 'react';
export default class Lists extends React.Component {
    constructor(){
        super(props);
    }
    componentDidMount(){
        fetch("http://localhost:4000/tasks",{
            method:'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((data)=>{
            console.log(data);
        })
    }
    render(){
        const {tasks} = this.props;
        return (
            <div>
                Task Detailas as follows,{tasks}
            </div>
        )
    }
}