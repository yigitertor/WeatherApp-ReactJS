import React, { useState } from "react";
import styled from "styled-components";
import { WeatherIcons } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ForecastContainer from "./ForecastContainer";

const WeatherInfoIcons = {
  Sunset: "/icons/temp.svg",
  Sunrise: "/icons/temp.svg",
  Humidity: "/icons/humidity.svg",
  Wind: "/icons/wind.svg",
  Pressure: "/icons/pressure.svg",
  Thermal_Sensation: "/icons/thermometer.svg",
};

const Location = styled.span`
  margin: 10px auto;
  text-transform: capitalize;
  font-size: 28px;
  font-weight: bold;
  color: White;
`;
const Condition = styled.span`
  margin: 20px auto;
  text-transform: capitalize;
  font-size: 14px;
  color: #ffffff;

  & span {
    width: 97px;
    height: 58px;

    font-family: "Nunito";
    font-style: normal;
    font-weight: 800;
    font-size: 48px;
    line-height: 120%;

    display: flex;
    align-items: center;
    text-align: right;
    color: #ffffff;
  }
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;
const WeatherContainer = styled.div.attrs((props) => ({
  style: {
    backgroundImage: (() => {
      const isDay = isDaytime(props.weather?.weather[0].icon);
      const weatherCondition = props.weather?.weather[0].main;
      let imageUrl;

      if (isDay) {
        imageUrl = getDaytimeImage(weatherCondition);
      } else {
        imageUrl = getNighttimeImage(weatherCondition);
      }

      return `url('${imageUrl}')`;
    })(),
  },
}))`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
`;

// Saatin gündüz veya gece olup olmadığını kontrol et
const isDaytime = (icon) => {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18;
};

// Gece için arka plan resmi
const getNighttimeImage = (weatherCondition) => {
  switch (weatherCondition) {
    case "Clear":
      return "https://pics.craiyon.com/2023-11-16/BjUZcXlZRQWOWgYFMXELWw.webp";
    case "Clouds":
      return "https://img.freepik.com/premium-vector/night-sky-background-with-clouds-stars_116220-98.jpg";
    case "Rain":
      return "https://pics.craiyon.com/2023-11-29/lythZKvRTQqaSHjk21ABXA.webp";
    default:
      return "https://pics.craiyon.com/2023-11-16/BjUZcXlZRQWOWgYFMXELWw.webp";
  }
};

// Gündüz için arka plan resmi
const getDaytimeImage = (weatherCondition) => {
  switch (weatherCondition) {
    case "Clear":
      return "https://img.freepik.com/free-vector/sky-background-video-conferencing_23-2148630092.jpg?t=st=1713552459~exp=1713556059~hmac=85ab85d23c68d05e032249590e7f65342ba107f0c258b761df18d17b86ede757&w=900";
    case "Clouds":
      return "https://www.shutterstock.com/image-photo/dramatic-black-cloud-before-rainy-260nw-549197416.jpg";
    case "Rain":
      return "https://cdn.girls.buzz/images/girls.buzz.max-1440x900.webp";
    default:
      return "https://upload.wikimedia.org/wikipedia/commons/0/07/Clear_Sky.jpg";
  }
};

const WeatherInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 16px;
  gap: 8px;
  height: 292px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 24px;

  width: 327px;
  height: 56px;
  border-bottom: 1px solid #1c1c27;
  background: #16161f;
  border-radius: 12px;
`;
const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 24px;

  width: 327px;
  height: 56px;
  color: #fafafa;
  & span {
    //styleName: Heading xs;
    font-family: Nunito;
    font-size: 14px;
    font-weight: 700;
    line-height: 19.6px;
    text-align: center;
    color: #bfbfd4;
  }
`;

const WeatherInfoComponent = (props) => {
  const { name, value } = props;
  return (
    <InfoContainer>
      <InfoIcon src={WeatherInfoIcons[name]} />
      <InfoLabel>
        <span>{name}</span>
        {value}
      </InfoLabel>
    </InfoContainer>
  );
};

const BackButton = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  color: white;
  background-color: #7692c9;
  padding: 5px 10px;
  border-radius: 5px;
`;

const ForecastButton = styled.button`
  padding: 0;
  margin: 0;
  position: absolute;
  cursor: pointer;
  overflow-y: auto;
  top: calc(35%);
  left: 42%;
  transform: translateX(-50%);
  font-family: Nunito;
  font-size: 14px;
  font-weight: 700;
  color: white;
  background-color: #7692c9;
  padding: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  @media screen and (max-width: 768px) {
    left: 30%;
  }
`;

const CurrentWeatherLabel = styled.span`
  padding: 0;
  margin: 0;
  position: absolute;
  width: 208px;
  max-height: 200px;
  overflow-y: auto;
  top: calc(7%);
  left: 46%;
  transform: translateX(-50%);
  font-family: Nunito;
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

const WeatherComponent = (props) => {
  const { weather, onBackButtonClick } = props;
  const [showForecast, setShowForecast] = useState(false); // Tahmin sayfasının görünürlüğünü kontrol etmek için durum ekleyelim

  const isDay = weather?.weather[0].icon?.includes("d");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  return (
    <>
      {showForecast ? ( // Tahmin sayfası görünürse anlık hava durumu sonuçlarını gizle
        <ForecastContainer weather={weather} />
      ) : (
        <>
          <CurrentWeatherLabel>Current Weather</CurrentWeatherLabel>
          <WeatherContainer weather={weather}>
            <Condition>
              <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
              {`  |  ${weather?.weather[0].description}`}
            </Condition>
            <WeatherIcon src={WeatherIcons[weather?.weather[0].icon]} />
            <BackButton onClick={onBackButtonClick}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </BackButton>
            <ForecastButton onClick={() => setShowForecast(true)}>
              Forecast
            </ForecastButton>{" "}
            {/* Tahmin butonuna tıklamada tahmin sayfasının görünürlüğünü true yap */}
          </WeatherContainer>
          <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>
          <WeatherInfoContainer>
            <WeatherInfoComponent
              name={"Thermal_Sensation"}
              value={`${Math.floor(weather?.main?.feels_like - 273)}°C`}
            />
            <WeatherInfoComponent
              name={isDay ? "Sunset" : "Sunrise"}
              value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}
            />
            <WeatherInfoComponent
              name={"Humidity"}
              value={weather?.main?.humidity}
            />
            <WeatherInfoComponent name={"Wind"} value={weather?.wind?.speed} />
            <WeatherInfoComponent
              name={"Pressure"}
              value={weather?.main?.pressure}
            />
          </WeatherInfoContainer>
          <BackButton onClick={onBackButtonClick}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </BackButton>
        </>
      )}
    </>
  );
};

export default WeatherComponent;
