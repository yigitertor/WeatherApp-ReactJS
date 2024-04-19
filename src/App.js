import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./modules/CityComponent";
import WeatherComponent from "./modules/WeatherInfoComponent";

export const WeatherIcons = {
  "01d": "/icons/sunny.svg",
  "01n": "/icons/night.svg",
  "02d": "/icons/day.svg",
  "02n": "/icons/cloudy-night.svg",
  "03d": "/icons/cloudy.svg",
  "03n": "/icons/cloudy.svg",
  "04d": "/icons/perfect-day.svg",
  "04n": "/icons/cloudy-night.svg",
  "09d": "/icons/rain.svg",
  "09n": "/icons/rain-night.svg",
  "10d": "/icons/rain.svg",
  "10n": "/icons/rain-night.svg",
  "11d": "/icons/storm.svg",
  "11n": "/icons/storm.svg",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  height: 620px; //820px on figma
  padding: 10px 10px 30px;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 #555;
  background: #13131a;
`;

const CloseButton = styled.span`
  padding: 2px 3px;
  background-color: black;
  border-radius: 50%;
  color: white;
  position: absolute;
`;

// App.js

function App() {
  const [weather, updateWeather] = useState();
  const [showCityComponent, setShowCityComponent] = useState(true); // Ana arama ekranını göstermek için durum

  const fetchWeatherByLocation = async (city) => {
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8297725875f39e37ed6a7bc2e1fc738c`
      );
      updateWeather(response.data);
      setShowCityComponent(false); // Hava durumu bilgilerini aldığımızda ana arama ekranını gizle
    } catch (error) {
      console.error("Hava durumu bilgisini alırken bir hata oluştu:", error);
    }
  };

  const handleBackButtonClick = () => {
    updateWeather(null);
    setShowCityComponent(true);
  };

  return (
    <Container>
      {showCityComponent ? ( // Ana arama ekranını göster
        <CityComponent fetchWeather={fetchWeatherByLocation} />
      ) : (
        <WeatherComponent
          weather={weather}
          onBackButtonClick={handleBackButtonClick}
        />
      )}
    </Container>
  );
}

export default App;
