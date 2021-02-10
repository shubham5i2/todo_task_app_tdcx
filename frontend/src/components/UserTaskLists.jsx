import * as React from 'react';
import * as PropTypes from "prop-types";
import { DataGrid } from '@material-ui/data-grid'; 
import { del, put } from 'superagent';

export default class UserTaskLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userTasks : {}
        }
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }
    componentDidMount(){
        this.setState({
            userTasks: this.props
        })
    }
    updateTask(id,loggedId){
        put(`http://localhost:4000/tasks/${id}/`,{loggedId},(err,data) => {
            if(err){
                console.log("error occured")
            }
            else {
              this.props.taskUpdated(true);
            }
        })
    }
    deleteTask(id,loggedId){
      del(`http://localhost:4000/tasks/${id}/`,{loggedId},(err,data)=>{
        if(err){
          console.log("error occured");
        }
        else {
          this.props.taskUpdated(true);
        }
      })
    }
    render(){
        const {userTask,loggedId} = this.props;
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
                    this.updateTask(thisRow.id,loggedId);
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
                    this.deleteTask(thisRow.id,loggedId);
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