import './App.css';
import React, {useEffect, useState} from "react";
import Weather from './components/currentWeather';
import axios from 'axios'

function App() {

  const [currentLat, setCurrLat] = useState([]);
  const [currentLong, setCurrLong] = useState([]);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('')

  //gets current long/lat and api calls to get weather at location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setCurrLat(position.coords.latitude);
      setCurrLong(position.coords.longitude);
    });
    
    console.log("Latitude is:", currentLat)
    console.log("Longitude is:", currentLong)

  }, [currentLat, currentLong]);


  //uses axios to call api
  const getWeather = () => {

    //`${process.env.REACT_APP_API_URL}lat=${currentLat}&lon=${currentLong}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    //`${process.env.REACT_APP_API_URL}q=${location}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    axios.get(`${process.env.REACT_APP_API_URL}q=${location}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`).then((response) =>
    {
      setData(response.data)
      console.log(location)
      console.log(response.data)
    })
  }


  return (
    <div className="App">
      <div className='Search'>
        <input
        class = "input"
        placeholder='Enter Location'
        value={location}
        onChange={event => setLocation(event.target.value)}
        type="text"/>
        <button className='Btn' onClick={getWeather}>Search</button>
      </div>
      
      <div className='info'>
        <div className='location'>
          <p>{data.name}</p>
        </div>
        <div className='temperature'>
          {data.main ? <p> {data.main.temp}°F</p>: null}
        </div>
        <div className='feels'>
          {data.main ? <p>Feels like: {data.main.feels_like}°F</p>: null}
        </div>
        <div className='humid'>
          {data.main ? <p>Humidity: {data.main.humidity}%</p>: null}
        </div>
        <div className='wind'>
          {data.main ? <p>Winds: {data.wind.speed}mph</p>: null}
        </div>
      </div>
    </div>
  );
}

export default App;
