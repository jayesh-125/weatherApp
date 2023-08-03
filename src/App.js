import './App.scss';
import React, { useState } from 'react';
import rain from './raini.png';
import snoozy from './snowy.png';
import sun from './sun.png';
import cloud from './Cloud.png';
import haze from './haze.png';
import mist from './mist.png';
import Home from './home1.png';
const ApiData = {
  key: 'f9e5da39676990a4a71e70b6f24b2eee',
  baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}
function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([])
  console.log("data", data);
  const weather = (ev) => {
    if (ev.key === 'Enter') {
      fetch(`${ApiData.baseUrl}?q=${search}&units=metric&appid=${ApiData.key}`)
        .then(res => res.json())
        .then(result => {
          if (data) {
            setData(result);
            setSearch(search);
          }
          else {
            alert("Enter Your city")
          }
        })
    }
  }
  // get date
  const timeDate = () => {

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    // Array of days (Sunday is at index 0, Saturday is at index 6)
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const a = new Date();
    const day = days[a.getDay()];
    const date = a.getDate();
    const mon = months[a.getMonth()];
    const year = a.getFullYear();
    return `${day}, ${date} ${mon}, ${year}`
  }


  return (
    <div className={(typeof data.main != 'undefined') ? (data?.main?.temp > 25) ? 'App sumer' : 'App winter' : 'App'}>
      <h1 className="h1" >Weather App</h1>
      <div className='inp-div'>
        <input type="text" name="search" value={search} onChange={(e) => { setSearch(e.target.value) }} onKeyDownCapture={weather} placeholder="Enter Your city" />
      </div>
      {(typeof data.main != 'undefined') ? (
        <div className='data'>
          <div className="date">
            <b>{timeDate()}</b>
            <span className='city'>{data?.name}, {data?.sys?.country}</span>
          </div>
          <div className='mood'>
            <img src={(data?.weather[0]?.main === "Rain") ? rain : (data?.weather[0]?.main === "Haze") ? haze : (data?.weather[0]?.main === "Snoozy") ? snoozy : (data?.weather[0]?.main === "Sunny") ? sun : (data?.weather[0]?.main === "Mist") ? mist : cloud} alt="" srcset="" />
            <p>{data?.weather[0]?.main}</p>
          </div>
          <div className="temp">
            {Math.round(data?.main?.temp)}<span>°C</span>
          </div>
          <div className="d-flex">
            <div className="col2">
              <span>pressure</span><br />
              <span>{data?.main?.pressure + ` mbar`}</span>
            </div>
            <div className="col2">
              <span>Wind speed</span><br />
              <span>{data?.wind?.speed + `km/h`}</span>
            </div>
            <div className="col2">
              <span>Humidity</span><br />
              <span>{data?.main?.humidity + `%`}</span>
            </div>
          </div>
        </div>
      ) :
        <>
        <img src={Home} alt="home page" srcset="home page" className='home' />
        </>
      }
    </div>
  );
}
export default App;
