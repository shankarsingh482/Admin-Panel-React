import React from 'react';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Forgot_password from './components/Forgot Password/Forgot_password';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
require('dotenv').config()

function App(props) {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/forgot_password" component={Forgot_password} />
          <Route exact path='/login' component={Login} />
          {localStorage.getItem('token') ? <Route path='/' component={Navbar} /> : <Redirect to='/login' />}

        </Switch>
      </Router>


    </React.Fragment>

  );
}

export default App;




