import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Main from './components/Main';
import LocationContext from './state/LocationContext';

function App() {

  const [location, setLocation] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://ipapi.co/json/")
        .then(response => {
          return response.json();
        })
        .then((data) => {
          data.region = data.region_code
          data.country = data.country_name
          console.log("result", data.region, data.country)
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
