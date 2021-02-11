import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const {taskInfo} = this.props;
        console.log(taskInfo);
        const completed = taskInfo.filter(item=>item.isTaskCompleted===true);
        console.log(completed);
        return (
            <div>
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
                        {completed.length} completed out of {taskInfo.length}
                        <br />
                    </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                    <Typography variant="h5" component="h2">
                        Progress
                    </Typography>
                    <CircularProgressbar value={66} text={`${66}%`} />;
                    </CardContent>
                </Card>
            </div>
        )
    }
}