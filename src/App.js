import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Import page
import Wrapper from './components/hoc';

function App() {
  return (

    <Router>
      <Wrapper>
        <Switch>
          <Route path="/" exact />
          <Route render={() => (<p>404</p>)} />
        </Switch>
      </Wrapper>
    </Router>
  );
}

export default App;
