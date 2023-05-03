import React from 'react';

const Weather = ({weatherData}) => (
    <div className='Info'>
        <header>Current Weather</header>
        <p>Temperature: {weatherData.main.temp}</p>
    </div>
)
export default Weather;