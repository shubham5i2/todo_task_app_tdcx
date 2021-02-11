import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import 'react-circular-progressbar/dist/styles.css';
import '../stylesheets/dashboard.css';
export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const {taskInfo} = this.props;
        console.log(taskInfo);
        const completed = taskInfo.filter(item=>item.isTaskCompleted===true);
        const percentage = (completed.length/taskInfo.length)*100;
        const tasksToDisplay = taskInfo.slice(0,3).map(item=>{return <li>{item.task_name}</li>})
        return (
            <div className={"info-cards"}>
                <Card>
                    <CardContent>
                    <Typography variant="h5" component="h2">
                        Task Overview
                    </Typography>
                    <Typography variant="body2" component="p">
                        {completed.length} completed out of {taskInfo.length}
                        <br />
                    </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                    <Typography variant="h5" component="h2">
                        Latest Tasks
                    </Typography>
                    <Typography variant="body2" component="p">
                        {tasksToDisplay}
                    </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                    <Typography variant="h5" component="h2">
                        Progress
                    </Typography>
                    <CircularProgressbar
                        value={percentage}
                        strokeWidth={50}
                        styles={buildStyles({
                        strokeLinecap: "butt"
                        })}
                        />
                    </CardContent>
                </Card>
            </div>
        )
    }
}
