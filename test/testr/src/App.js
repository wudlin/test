import React, { Component } from 'react';
import './App.css';


const usre = {
    name:'aaa',
    age:18
  }
class App extends Component {
  state={
    val:""
  }
  formname(user) {
    if (typeof user === 'object'){
      return user.name+' '+usre.age
    }
    return ' null'
  }
  render() {
    return (
      <div className="App">
        <p>test1,{usre.name},{this.formname(111)}</p>
        {/* <input type="text" value={this.state.val}/> */}
        <p>{this.state.val}</p>
      </div>
    );
  }
}

export default App;
