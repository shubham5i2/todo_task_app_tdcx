import * as React from 'react';
import * as PropTypes from "prop-types";
import { DataGrid } from '@material-ui/data-grid'; 

export default class UserTaskLists extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const {userTask} = this.props;
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'taskname', headerName: 'Name', width: 130 },
            { field: 'taskstatus', headerName: 'Status', width: 130 },
          ];
        const rows = [];
        userTask.map((tasks)=>{
            rows.push({"id":tasks._id || "task","taskname":tasks.task_name,"taskstatus":tasks.isTaskCompleted});
        });
        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
            </div>
        )
    }
}