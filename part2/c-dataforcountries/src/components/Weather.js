import React from 'react';

const Weather = ({ city, currentWeather }) => {
  const compassDirections = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
    'N',
  ];
  const windDirection = compassDirections[Math.round(currentWeather.wind.deg / 22.5)];

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>
        <strong>temperature: </strong>
        {`${currentWeather.main.temp}°F`}
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
        alt={`weather in ${city}`}
      />
      <p>
        <strong>wind: </strong>
        {currentWeather.wind.speed}mph from {windDirection}{' '}
        {currentWeather.wind.hasOwnProperty('gust')
          ? `with gusts of ${currentWeather.wind.gust}mph`
          : null}
      </p>
    </div>
  );
};

export default Weather;
