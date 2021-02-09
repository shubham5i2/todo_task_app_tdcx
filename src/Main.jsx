import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import React,{props} from 'react';
import {addNewTask,addNewTaskReducer} from './state/redux-actions';
import connect from "react-redux/es/connect/connect";
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
export default class Main extends React.Component {
  render(){
    const {tasks} = this.props;
    console.log(tasks);
    return (
        <div className="App">
          <Dashboard/>
        </div>
    );
  }
  
}
