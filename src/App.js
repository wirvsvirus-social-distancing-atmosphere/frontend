import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Main from './components/Main';
import LocationContext from './state/LocationContext';

function App() {

  const [location, setLocation] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://ip-api.com/json/")
        .then(response => {
          return response.json();
        })
        .then((data) => {
          setLocation(data);
        });
    }
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <LocationContext.Provider value={ location }>
        <Main />
      </LocationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
