import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from './Header/Header';
import Logout from './Header/Logout';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Layout} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
