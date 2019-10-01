import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from './Layout/Layout';
import Logout from './Header/Logout';
import ComingSoonComponent from './Components/ComingSoonComponent';
import CreateSRComponent from './Components/CreateSRComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Layout} />
          <Route path="/logout" component={Logout} />
          <Route path="/comingsoon" component={ComingSoonComponent} />
          <Route path="/createsr" component={CreateSRComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
