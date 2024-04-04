import styled from "styled-components";

const WeatherLogo = styled.img`
  width: 160px;
  height: 40px;
  margin: 40px auto;
`;

const ChooseCityLabel = styled.span`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin: 10px auto;
`;

const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  border: black solid 1px;
  border-radius: 2px;
  color: black;
  font-size: 18px;
  font-weight: bold;
  margin: 20px auto;

  & input {
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none;
    font-weight: bold;
  }

  & button {
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none;
    font-weight: bold;
    color: white;
    background-color: black;
    cursor: pointer;
  }
`;

const CityComponent = () => {
  return (
    <>
      <WeatherLogo src="icons/logo.png" />
      <ChooseCityLabel>
        Choose a location to see the weather forecast
      </ChooseCityLabel>

      <SearchBox>
        <input placeholder="Search Location" />
        <button>Search</button>
      </SearchBox>
    </>
  );
};
export default CityComponent;
