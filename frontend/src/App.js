import * as React from "react";
import * as PropTypes from "prop-types";
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import CenterView from './components/Center-View';
import {get,post} from 'superagent';
const userLogin = false;
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      userLogin : false,
      userName: null,
      userTasks: null,
      userId: null
    }
    this.makeUserLogin = this.makeUserLogin.bind(this);
    this.initiateLogin = this.initiateLogin.bind(this);
  }
  makeUserLogin() {
    this.setState({
      userLogin: true
    })
  }
  initiateLogin(id,name){
    console.log("Login initiated",id,name);
    post("http://localhost:4000/login",{id:id,name:name}).then((data)=>{
      this.setState({
        userName: data.body.userInfo.name,
        userTasks: data.body.userInfo.tasks,
        userId: data.body.userInfo.id,
        userLogin: true
      })
    })
  }
  render(){
    const {userLogin,userName,userTasks,userId} = this.state;
    return (
      <div className="App">
        <header className="App-header" >
          {userLogin && <Header loggedIn={userName}/>}  
          {userLogin && Array.isArray(userTasks) && userTasks.length === 0 && <CenterView displayType={"no-tasks"} loggedId={userId}/>}
          {!userLogin && <CenterView displayType={"login"} login={(id,name)=>{this.initiateLogin(id,name)}}/>}
        </header>
      </div>
    );
  }
}

export default App;