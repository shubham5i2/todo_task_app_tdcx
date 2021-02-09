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
      userLogin : false
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
      console.log(data);
    })
  }
  render(){
    const {userLogin} = this.state;
    return (
      <div className="App">
        <header className="App-header" >
          {userLogin && <Header />}  
          {userLogin && <CenterView displayType={"no-tasks"}/>}
          {!userLogin && <CenterView displayType={"login"} login={(id,name)=>{this.initiateLogin(id,name)}}/>}
        </header>
      </div>
    );
  }
}

export default App;