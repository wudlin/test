import React, { Component } from 'react';
import '../App.css';


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
        <p>404 NotFound</p>
      </div>
    );
  }
}

export default App;
