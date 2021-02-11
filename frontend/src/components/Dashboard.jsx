import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

export default class Dashboard extends React.Component {
    render(){
        return (
            <div>
                <Card>
                    <CardContent>
                        {'Latest Task Details'}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {'Latest Task Details'}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        {'Latest Task Details'}
                    </CardContent>
                </Card>
            </div>
        )
    }
}