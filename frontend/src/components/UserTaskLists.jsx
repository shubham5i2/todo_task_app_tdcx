import * as React from 'react';
import * as PropTypes from "prop-types";
import { DataGrid } from '@material-ui/data-grid'; 
import { del, put } from 'superagent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../stylesheets/UserTaskLists.css';
export default class UserTaskLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userTasks : {},
            open: false
        }
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
    }
    componentDidMount(){
        this.setState({
            userTasks: this.props
        })
    }
    handleClickOpen(){
      this.setState({
        open:true
      })
    }
    handleClose(){
      this.setState({
        open: false
      })
    }
    addNewTask(){
      console.log(document.getElementById("name").value);
      if(document.getElementById("name").value.trim().length>0){
        this.props.addNewTask(document.getElementById("name").value);
        this.setState({
          open:false
        })
      }
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
            
                  return (<Button variant="outlined" color="primary" onClick={onClick}>
                            Modify State
                          </Button>)
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
            
                  return (<Button variant="outlined" color="primary" onClick={deleteTask}>
                            Delete
                          </Button>)
                }
              },
          ];
        const rows = [];
        userTask.map((tasks)=>{
            rows.push({"id":tasks._id || "task","taskname":tasks.task_name,"taskstatus":tasks.isTaskCompleted?'Completed':'Not Completed'});
        });
        return (
            <>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              Add New Task
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add New Task
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Task Name"
                  type="text"
                  required
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.addNewTask} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
            </div>
            </>
        )
    }
}