import React from "react";
import Axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ForecastContainer = ({ weather, onBackButtonClick }) => {
  const [forecast, setForecast] = React.useState(null);

  const fetchForecast = async () => {
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${weather.name}&appid=8297725875f39e37ed6a7bc2e1fc738c&units=metric`
      );
      setForecast(response.data);
    } catch (error) {
      console.error("Hava durumu tahminlerini alırken bir hata oluştu:", error);
    }
  };

  React.useEffect(() => {
    fetchForecast();
  }, [weather]);

  if (!forecast) return null;

  const today = new Date();
  const nextFiveDays = [];
  for (let i = 1; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    nextFiveDays.push(
      date.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    );
  }

  const groupedForecasts = {};
  forecast.list.forEach((item) => {
    const date = new Date(item.dt_txt).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    if (nextFiveDays.includes(date)) {
      if (!groupedForecasts[date]) {
        groupedForecasts[date] = {
          date: date,
          temps: [],
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        };
      }
      groupedForecasts[date].temps.push(item.main.temp);
    }
  });

  return (
    <Container>
      <Header>5-Day Weather Forecast</Header>
      <BackButton onClick={onBackButtonClick}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </BackButton>
      <ForecastWrapper>
        {Object.values(groupedForecasts).map((forecast, index) => (
          <ForecastBox key={index}>
            <DateText>{forecast.date}</DateText>
            <WeatherInfo>
              <IconImage
                src={`https://openweathermap.org/img/wn/${forecast.icon}.png`}
                alt={forecast.description}
              />
              <TemperatureText>{`${Math.round(
                forecast.temps.reduce((acc, temp) => acc + temp, 0) /
                  forecast.temps.length
              )}°C`}</TemperatureText>
            </WeatherInfo>
          </ForecastBox>
        ))}
      </ForecastWrapper>
    </Container>
  );
};

export default ForecastContainer;

const Container = styled.div`
  padding: 20px;
`;

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

const ForecastWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;

const ForecastBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #1e1e29;
  padding: 20px;
  border-radius: 10px;
  color: white;
  flex: 1;
`;

const DateText = styled.span`
  font-size: 18px;
  margin-bottom: 10px;
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
`;

const IconImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const TemperatureText = styled.span`
  font-size: 24px;
`;

const Header = styled.h2`
  color: white;
  font-size: 24px;
  margin-bottom: 10px;
  margin-top: 0;
  text-align: center;
  font-family: "Nunito";
  font-style: normal;
`;
