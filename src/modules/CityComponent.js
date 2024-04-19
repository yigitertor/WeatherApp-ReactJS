import styled from "styled-components";
import React, { useState } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px;

  & input {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background: #1e1e29;
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none;
    font-weight: bold;
    color: white;
  }
  & button {
    background-color: #7692c9;
    font-size: 14px;
    padding: 0 10px;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 8px;
    margin-left: 3px;
    margin-right: 3px;
  }
`;
const ChooseCityLabel = styled.span`
  width: 311px;
  height: 20px;

  /* Text sm */
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;

  /* identical to box height, or 20px */
  align-items: center;
  text-align: center;

  /* Base/Gray 200 */
  color: #bfbfd4;
`;

const WelcomeLabel = styled.div`
  color: white;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 140%;
  & span {
    color: #7692c9;
  }
`;

const AppLogo = styled.img`
  width: 186px;
  height: 32px;
  left: calc(50% - 186px / 2 - 0.5px);
  top: 48px;
  opacity: 0.8;
  margin: 40px auto;
  margin-bottom: 140px;
`;

const AutocompleteList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: #1e1e29;
  border-radius: 8px;
  width: 208px;
  max-height: 200px;
  overflow-y: auto;
  top: calc(100% + -335px);
  left: 50%;
  transform: translateX(-50%);
`;

const AutocompleteItem = styled.li`
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: white;
  &:hover {
    background-color: #3d3d4d;
  }
`;

const CityComponent = ({ updateCity, fetchWeather }) => {
  const [city, setCity] = useState("");
  const [autocompleteCities, setAutocompleteCities] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setCity(value);

    try {
      const response = await Axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${value}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "64a947ac66msh6990946afef4b41p186a5djsn3522f68f3e2e",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      const cities = response.data.data.map((city) => ({
        name: city.city,
        country: city.countryCode,
      }));
      setAutocompleteCities(cities);
    } catch (error) {
      console.error("API'den şehir verisi alınırken bir hata oluştu:", error);
    }
  };
  const handleAutocompleteClick = (cityName) => {
    setCity(cityName);
    setAutocompleteCities([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
    setCity("");
  };

  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Koordinatları kullanarak hava durumu bilgisi al
        const response = await Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8297725875f39e37ed6a7bc2e1fc738c`
        );
        fetchWeather(response.data.name);
      },
      (error) => {
        console.error("Konum bilgisini alırken bir hata oluştu:", error);
      }
    );
  };

  return (
    <>
      <AppLogo src={"/icons/logo.png"} />
      <WelcomeLabel>
        Welcome to <span>TypeWeather</span>
      </WelcomeLabel>
      <ChooseCityLabel>
        Choose a location to see the weather forecast
      </ChooseCityLabel>
      <SearchBox onSubmit={handleSubmit}>
        <button type="button" onClick={handleLocationClick}>
          <FontAwesomeIcon icon={faLocationDot} />
        </button>
        <input
          value={city}
          onChange={handleInputChange}
          placeholder="Search location"
        />
        <button type="submit">Search</button>

        {autocompleteCities.length > 0 && (
          <AutocompleteList>
            {autocompleteCities.map((city, index) => (
              <AutocompleteItem
                key={index}
                onClick={() => handleAutocompleteClick(city.name)}
              >
                {`${city.name}, ${city.country}`}
              </AutocompleteItem>
            ))}
          </AutocompleteList>
        )}
      </SearchBox>
    </>
  );
};

export default CityComponent;
