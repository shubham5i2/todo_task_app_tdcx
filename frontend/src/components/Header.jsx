import React from 'react';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="App-Component-Header">
                <p className="user">Ganesha</p>
                <p className="right-element">Logout</p>
            </div>
        )
    }
}