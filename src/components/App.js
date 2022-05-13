import React, { useEffect, useState } from 'react';
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from './Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token) dispatch({
      type: actionTypes.SET_USER,
      user: JSON.parse(token)
    });
  }, [])
console.log(user);
  return (
    // BEM Naming convention
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
