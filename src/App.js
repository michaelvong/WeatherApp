import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";

function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    
    console.log("Latitude is:", lat)
    console.log("Longitude is:", long)
  }, [lat, long]);


  return (
    <div className="App">
      <div>SearchBar</div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Weather App
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
