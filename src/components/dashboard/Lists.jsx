import React,{props} from 'react';

export default class Lists extends React.Component {
    constructor(){
        super(props);
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