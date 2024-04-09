import React from "react";
import styled from "styled-components";
import { WeatherIcons } from "../App";

export const WeatherInfoIcons = {
  Sunset: "/icons/temp.svg",
  Sunrise: "/icons/temp.svg",
  Humidity: "/icons/humidity.svg",
  Wind: "/icons/wind.svg",
  Pressure: "/icons/pressure.svg",
  Thermal_Sensation: "/icons/thermometer.svg",
};
const Location = styled.span`
  margin: 15px auto;
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

    /* Heading xl */
    font-family: "Nunito";
    font-style: normal;
    font-weight: 800;
    font-size: 48px;
    line-height: 120%;
    /* identical to box height, or 58px */
    display: flex;
    align-items: center;
    text-align: right;

    /* Base/White */
    color: #ffffff;
  }
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;
const WeatherContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 30px auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

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

const WeatherComponent = (props) => {
  const { weather } = props;
  const isDay = weather?.weather[0].icon?.includes("d");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  return (
    <>
      <WeatherContainer>
        <Condition>
          <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
          {`  |  ${weather?.weather[0].description}`}
        </Condition>
        <WeatherIcon src={WeatherIcons[weather?.weather[0].icon]} />
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
    </>
  );
};

export default WeatherComponent;
