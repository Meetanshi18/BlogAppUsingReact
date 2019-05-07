import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import UserSignup from './components/UserSignup'
import UserLogin from './components/UserLogin'
import Profile from './components/Profile';

// import About from './components/About'
// import Contact from './components/Contact'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
                   
          <Route exact path='/' component={Home}/>
          <Route path='/signup' component={UserSignup}/>
          <Route path='/login' component={UserLogin}/>
          <Route path='/profile' component={Profile}/>
        </div>
      </BrowserRouter>
      
      // <h1>Server is not on right now</h1>
    );
  }
}

export default App;
