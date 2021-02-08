import React,{props} from 'react';
import Lists from './Lists';

export default class Dashboard extends React.Component {
    constructor(){
        super(props);
    }
    render(){
        return (
            <div>
                <Lists tasks={"Hellos"}/>
            </div>
        )
    }
}