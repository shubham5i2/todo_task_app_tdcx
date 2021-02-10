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
            {
                field: "update",
                headerName: "Update Status",
                sortable: false,
                width: 150,
                disableClickEventBubbling: true,
                renderCell: (params) => {
                  const onClick = () => {
                    const api = params.api;
                    console.log(api);
                    const fields = api
                      .getAllColumns()
                      .map((c) => c.field)
                      .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};
            
                    fields.forEach((f) => {
                      thisRow[f] = params.getValue(f);
                    });
                    console.log(thisRow);
                    //return alert(JSON.stringify(thisRow, null, 4));
                  };
            
                  return <button onClick={onClick}>Modify State</button>;
                }
              },
              {
                field: "delete",
                headerName: "Delete Task",
                sortable: false,
                width: 150,
                disableClickEventBubbling: true,
                renderCell: (params) => {
                  const deleteTask = () => {
                    const api = params.api;
                    console.log(api);
                    const fields = api
                      .getAllColumns()
                      .map((c) => c.field)
                      .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};
            
                    fields.forEach((f) => {
                      thisRow[f] = params.getValue(f);
                    });
                    console.log(thisRow);
                    //return alert(JSON.stringify(thisRow, null, 4));
                  };
            
                  return <button onClick={deleteTask}>Delete</button>;
                }
              },
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