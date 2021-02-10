import * as React from "react";
import * as PropTypes from "prop-types";
import logo from './logo.svg';
import userlogo from './avatar/male-avatar-2.svg';
import './App.css';
import Header from './components/Header';
import CenterView from './components/Center-View';
import {get,post} from 'superagent';
import UserTaskLists from './components/UserTaskLists';
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      userLogin : false,
      userName: null,
      userTasks: null,
      userId: null,
    }
    this.makeUserLogin = this.makeUserLogin.bind(this);
    this.initiateLogin = this.initiateLogin.bind(this);
    this.initiateAddNewTask = this.initiateAddNewTask.bind(this);
    this.checkUserSession();
  }
  checkUserSession(){
    get("http://localhost:4000/").then((data)=>{
      this.setState({
        userName: data.body.userInfo.name,
        userTasks: data.body.userInfo.tasks,
        userId: data.body.userInfo.id,
        userLogin: true
      })
    })
  }
  makeUserLogin() {
    this.setState({
      userLogin: true
    })
  }
  initiateLogin(id,name){
    console.log("Login initiated",id,name);
    post("http://localhost:4000/login",{id:id,name:name}).then((data)=>{
      console.log(data.body);
      this.setState({
        userName: data.body.userInfo.name,
        userTasks: data.body.userInfo.tasks,
        userId: data.body.userInfo.id,
        userLogin: true
      })
    })
  }
  initiateAddNewTask = async(name) =>{
    console.log("add New task begins",name,this.state.userId);
    await post("http://localhost:4000/tasks",{id:this.state.userId,task_id:21,task_name:name,isTaskCompleted:false});
    get("http://localhost:4000/tasks").then((data)=>{
      console.log(data.body.data.tasks);
      this.setState({
        userTasks: data.body.data.tasks
      })
    })
  }
  render(){
    const {userLogin,userName,userTasks,userId} = this.state;
    console.log(userTasks);
    return (
      <div className="App">
        <header className="App-header" >
          {userLogin && <Header loggedIn={userName} logo={userlogo}/>}  
          {userLogin && Array.isArray(userTasks) && userTasks.length > 0 && <UserTaskLists userTask={userTasks}/>}
          {userLogin && Array.isArray(userTasks) && userTasks.length === 0 && <CenterView displayType={"no-tasks"} loggedId={userId} addNewTask={(taskName) => {this.initiateAddNewTask(taskName)}}/>}
          {!userLogin && <CenterView displayType={"login"} login={(id,name)=>{this.initiateLogin(id,name)}}/>}
        </header>
      </div>
    );
  }
}

export default App;