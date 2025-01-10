import axios from 'axios';

const baseUrl = 'http://api.openweathermap.org';
const API_KEY = import.meta.env.VITE_API_KEY;

const geocode = (city, countryCode) => {
  const url = new URL('/geo/1.0/direct', baseUrl);
  url.searchParams.append('q', `${city},${countryCode}`);
  url.searchParams.append('limit', 1);
  url.searchParams.append('appid', API_KEY);
  return axios.get(url.toString()).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const weatherFromLatLon = (lat, lon) => {
  const url = new URL('/data/2.5/weather', baseUrl);
  url.searchParams.append('lat', lat);
  url.searchParams.append('lon', lon);
  url.searchParams.append('units', 'imperial');
  url.searchParams.append('appid', API_KEY);
  return axios.get(url.toString()).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const weather = (city, countryCode) => {
  return geocode(city, countryCode)
    .then((locations) => locations[0])
    .then((location) => weatherFromLatLon(location.lat, location.lon));
};

export default { weather };
