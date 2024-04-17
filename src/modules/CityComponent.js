import styled from "styled-components";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px;

  & input {
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

const CityComponent = (props) => {
  const { updateCity, fetchWeather } = props;
  return (
    <>
      <AppLogo src={"/icons/logo.png"} />
      <WelcomeLabel>
        Welcome to <span>TypeWeather</span>
      </WelcomeLabel>
      <ChooseCityLabel>
        Choose a location to see the weather forecast
      </ChooseCityLabel>
      <SearchBox onSubmit={fetchWeather}>
        <button type="submit">
          <FontAwesomeIcon icon={faLocationDot} />
        </button>
        <input
          onChange={(e) => updateCity(e.target.value)}
          placeholder="Search location"
        />
        <button type={"submit"}>Search</button>
      </SearchBox>
    </>
  );
};
export default CityComponent;
