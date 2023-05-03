import './App.css';
import React, {useEffect, useState} from "react";
import axios from 'axios'
import Forecast from './components/forecast'
function App() {

  const [currentLat, setCurrLat] = useState([]);
  const [currentLong, setCurrLong] = useState([]);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('');
  const [forecastData, setForecastData] = useState([]);

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
      //console.log(location)
      //console.log(response.data)
    })

    axios.get(`${process.env.REACT_APP_API_URL2}q=${location}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`).then((response1) =>
    {
      setForecastData(response1.data)
      //console.log(location)
      console.log(response1.data)
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
        <button className='Btn' onClick={getWeather}></button>
      </div>

      <div className='location'>
          <h1>{data.name}</h1>
      </div>

      {data.main ? <div className='info'>
        <div className='temperature'>
          <p> {data.main.temp}°F</p>
          <p>Temperature</p>
        </div>
        <div className='feels'>
          <p>{data.main.feels_like}°F</p>
          <p>Feels Like</p>
        </div>
        <div className='humid'>
          <p>{data.main.humidity}%</p>
          <p>Humidity</p>
        </div>
        <div className='wind'>
          <p>{data.wind.speed}mph</p>
          <p>Winds</p>
        </div>
      </div> : null}


      {forecastData.list ? <div className='forecast'> 
        <h1>Forecast</h1>
        <div className='futureData'>
          <Forecast data = {forecastData}/>
        </div>
      </div> : null}
    </div>
  );
}

export default App;
