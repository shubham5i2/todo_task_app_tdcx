import * as React from "react";
import * as PropTypes from "prop-types";
import logo from './logo.svg';
import userlogo from './avatar/male-avatar-2.svg';
import './App.css';
import Header from './components/Header';
import CenterView from './components/Center-View';
import {get,post} from 'superagent';
import UserTaskLists from './components/UserTaskLists';
import Dashboard from './components/Dashboard';
import axios from 'axios';
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
    this.updateTask = this.updateTask.bind(this);
    this.getUpdatedTasks = this.getUpdatedTasks.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    //this.checkUserSession();
  }

  componentDidMount(){
    let getExisting = localStorage.getItem("userId");
    console.log(getExisting);
    if(getExisting){
      post("http://localhost:4000/login",{id:getExisting,sessionExist:true}).then((data)=>{
      localStorage.setItem("userId",data.body.userInfo.id);
      this.setState({
        userName: data.body.userInfo.name,
        userTasks: data.body.userInfo.tasks,
        userId: data.body.userInfo.id,
        userLogin: true
      })
    })
    }
    else {
      this.setState({
        userLogin: false
      })
    }
  }
  logoutUser(id){
    localStorage.setItem("userId",null);
    this.setState({
      userLogin: false
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
      localStorage.setItem("userId",data.body.userInfo.id);
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
  getUpdatedTasks(){
    get("http://localhost:4000/tasks",{id:localStorage.getItem("userId")}).then((data)=>{
      console.log(data.body.data.tasks);
      this.setState({
        userTasks: data.body.data.tasks
      })
    })
  }
  updateTask(isUpdated) {
    console.log(isUpdated);
    if(isUpdated){
      this.getUpdatedTasks();
    }
  }
  render(){
    const {userLogin,userName,userTasks,userId} = this.state;
    return (
      <div className="App">
        <header className="App-header" >
          {userLogin && <Header loggedIn={userName} logo={userlogo} logout={()=>{this.logoutUser(userId)}}/>}
          {userLogin && Array.isArray(userTasks) && userTasks.length > 0 && <Dashboard taskInfo={userTasks}/>}  
          {userLogin && Array.isArray(userTasks) && userTasks.length > 0 && <UserTaskLists userTask={userTasks} loggedId={userId} taskUpdated={(isUpdated)=>this.updateTask(isUpdated)} addNewTask={(taskName) => {this.initiateAddNewTask(taskName)}}/>}
          {userLogin && Array.isArray(userTasks) && userTasks.length === 0 && <CenterView displayType={"no-tasks"} loggedId={userId} addNewTask={(taskName) => {this.initiateAddNewTask(taskName)}}/>}
          {!userLogin && <CenterView displayType={"login"} login={(id,name)=>{this.initiateLogin(id,name)}}/>}
        </header>
      </div>
    );
  }
}

export default App;