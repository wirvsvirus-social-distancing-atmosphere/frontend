import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';

import Main from './components/Main';
import firebaseConfig from "./configs/firebaseConfig";

function App() {

  useEffect(() => {
    // on startup init firebase connection
    firebase.initializeApp(firebaseConfig);
  });

  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
