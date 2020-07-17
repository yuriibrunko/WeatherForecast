import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';



class Header extends React.Component {
  render() {
    return( 
    <form onSubmit={this.props.WeatherMethod}>
      <header className="header">
        <input type="text" className="search" name="city" placeholder="Your city name"/>
        <button className="search-button">Search</button>
        <a href="">Current location</a>
      </header>
    </form>
    )
  }
}
class MenuItem extends React.Component {
  render() {
    return (
      <div>
        <a href="/hourly" className="menu-item">Hourly</a>
        <a href="/daily" className="menu-item">Daily</a>
      </div>
    );
  }
}
class Menu extends React.Component {
  render() {
    return <nav className="menu">
      <MenuItem />
    </nav>
  }
}
class Container extends React.Component {
  render () {
    return <section className="container">
      <h1>Current weather and forecasts in your city</h1>
      <Menu />
    </section>
  }
}
class Info extends React.Component {
  render () {
    return  <sidebar className="info">
      { this.props.city &&
        <div>
          <h2>Weather in {this.props.city}</h2>
          <h2>{this.props.temp} &deg;C</h2>
          <p>{this.props.description}</p>
        </div>
      }
      <table className="weather-info">
        <tr>
          <td>Wind</td>
          
          <td>{ this.props.speed && 
          <p>Gentle Breeze, {this.props.speed} m/s</p>}</td>
          
        </tr>
        <tr>
          <td>Cloudiness</td>
          <td>{this.props.description}</td>
        </tr>
        <tr>
          <td>Pressure</td>
          <td>{this.props.pressure && <p> {this.props.pressure} hpa</p>}</td>
        </tr>
        <tr>
          <td>Humidity</td>
          <td>{this.props.humidity && <p> {this.props.humidity}%</p>}</td>
        </tr>
        <tr>
          <td>Sunrise</td>
          <td>{this.props.sunrise}</td>
        </tr>
        <tr>
          <td>Sunset</td>
          <td>{this.props.sunset}</td>
        </tr>
        <tr>
          <td>Geo coords</td>
          <td>{this.props.lat && <p>{this.props.lat} , {this.props.lon}</p>}</td>
        </tr>
      </table>
      <p className="text">
        The weather forecast is displayed in<br></br> 
        accordance with your local time. Please pay<br></br> 
        attention to it when you will watch the<br></br> 
        weather in another time zone.
      </p>
    </sidebar>
  }
}
class ContentHourly extends React.Component {
  render() {
    return <section className="content-hourly">
      <h2>Hourly weather and forecasts in {this.props.city}, UA</h2>
      <div className="box-date">
        <p>Info day and time</p>
      </div>
      <div className="box-info">
        <p></p>
      </div>
      <div className="box-info">
        <p>This page for hourly weather forecast</p>
      </div>
      <div className="box-info">
        <p>This page for hourly weather forecast</p>
      </div>
    </section>
  }
}
class ContentDaily extends React.Component {
  render() {
    
      

    return <section className="content-daily">
      <h2>Daily weather and forecasts in Lviv, UA</h2>
      <div className="box-date">
        <p>Wed Jul 17 2019 Today</p>
      </div>
      <div className="box-info">
        <div className="weather-icon">
        
          
        </div>
        <div className="weather-prop">
        
          {/* <div className="temp"> &deg;C</div>
          <div className="speed">6.34 m/s</div>
          <div className="cloud">clouds: 0%</div>
          <div className="pressure">1009.59 hpa</div> */}
        </div> 
      </div> 
    </section>
  }
}

const API_KEY = 'c3160268987620a64f66cf6ac878c1ac';
class App extends React.Component {
  
   state = {
    city: undefined,
    country: undefined,
    temp: undefined,
    description: undefined,
    clouds: undefined,
    pressure: undefined,
    humidity: undefined,
    sunrise: undefined,
    sunset: undefined,
    speed: undefined,
    lat: undefined,
    lon: undefined
  }
  getHourlyWeather = async (e) => {
    e.preventDefault();
    
    const city = e.target.elements.city.value;
    const api_url = await fetch(`http://api.openweathermap.org/data/2.5/forecast/hourly?q=${city},&mode=xml`)
    const data = await api_url.json();

    this.setState ({
      temp: data.main.temp,
      description: data.weather[0].description,
      speed: data.wind.speed,
      clouds: data.clouds.all,
      pressure: data.main.pressure,
    });
  }
      


  gettingWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    const data = await api_url.json();

    var sunset = data.sys.sunset;
    var date_suns = new Date();
    date_suns.setTime(sunset);
    var sunset_date = date_suns.getHours() + ":" + date_suns.getMinutes() + ":" + date_suns.getSeconds();

    var sunrise = data.sys.sunrise;
    var date_sunr = new Date();
    date_sunr.setTime(sunrise);
    var sunrise_date = date_sunr.getHours() + ":" + date_sunr.getMinutes() + ":" + date_sunr.getSeconds();

    this.setState ({
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      clouds: data.clouds.all,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      sunrise: sunrise_date,
      sunset: sunset_date,
      speed: data.wind.speed,
      lat: data.coord.lat,
      lon: data.coord.lon
    });
  }
  
  render () {
    return (
      
    <div className="App">
      <Header WeatherMethod={this.gettingWeather}  />
      <Container />
      <section>
        <Info 
        city = {this.state.city}
        temp = {this.state.temp}
        description = {this.state.description}
        clouds = {this.state.clouds}
        pressure = {this.state.pressure}
        humidity = {this.state.humidity}
        sunrise = {this.state.sunrise}
        sunset = {this.state.sunset}
        speed = {this.state.speed}
        lat = {this.state.lat}
        lon = {this.state.lon}
        />
        
        <BrowserRouter>
          <Route path="/hourly" component={ContentHourly} />
          <Route path="/daily" component={ContentDaily}/>
        </BrowserRouter>
      </section>
    </div>
    )
  }
}

export default App;

