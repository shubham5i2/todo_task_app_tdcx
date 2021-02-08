import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import React,{props} from 'react';

class Main extends React.Component {
  render(){
    return (
      <div className="App">
        <Dashboard/>
      </div>
    );
  }
  
}

export default Main;/*connect(
  (state, props) => {
      let contactProfile = getContactProfileSel(state, props, true);
      if (prevProfile && isEqual(contactProfile, prevProfile)) contactProfile = prevProfile;
      else prevProfile = contactProfile;

      let allContactFields = getContactFields(state);
      if (prevContactFields && isEqual(allContactFields, prevContactFields)) allContactFields = prevContactFields;
      else prevContactFields = contactProfile;


      return {
          allContactFields,
          contactProfile,
          tags: getTagList(state),
      }
  },
  {
      createContactObject,
      requestContactFields,
      requestTagList,
  }
)(localize(CreateContact));*/
