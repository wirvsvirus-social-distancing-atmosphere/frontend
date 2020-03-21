import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Admission from './scenes/Admission/Admission';
import './Main.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Admission />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
