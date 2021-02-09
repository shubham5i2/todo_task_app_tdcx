import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
const userLogin = false;
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      userLogin : false
    }
    this.makeUserLogin = this.makeUserLogin.bind(this);
  }
  makeUserLogin() {
    this.setState({
      userLogin: true
    })
  }
  render(){
    const {userLogin} = this.state;
    return (
      <div className="App">
        <header className="App-header" onClick={this.makeUserLogin}>
          {userLogin && <Header />}  
        </header>
      </div>
    );
  }
}

export default App;