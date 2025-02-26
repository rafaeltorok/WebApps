import { useState, useEffect } from 'react';
import Notification from './components/Notification';
import List from './components/List';
import CountryData from './components/CountryData';
import axios from 'axios';
import './App.css';

function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [countriesFound, setCountriesFound] = useState([]);
  const [displayData, setDisplayData] = useState(false);

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => setCountriesList(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (searchCountry) {
      const filteredCountries = (
        countriesList.filter(
          c => c.name.common.toLowerCase().includes(searchCountry.toLowerCase()
        ))
      );
      setCountriesFound(filteredCountries);
      setDisplayData(filteredCountries.length <= 10);
    } else {
      setCountriesFound([]);
    }
  }, [searchCountry]);

  // Adds a delay of 500ms between the user typing and updating the page
  const handleSearchCountry = (event) => {
    const handler = setTimeout(() => {
      setSearchCountry(event.target.value);
    }, 300);
  
    return () => clearTimeout(handler);
  };

  const handleButtonClick = country => {
    setCountriesFound([country]);
    setDisplayData(true);
  }

  return (
    <>
      <div>
        <form>
          <label htmlFor='search-field'>Search</label>
          <input type='text' id='search-field' name='search-field' onChange={handleSearchCountry} />
        </form>
      </div>
      <Notification displayData={displayData} listSize={countriesFound.length} />
      {displayData && (
        <ul className='countries-list'>
          {countriesFound.map(country => (
            <List 
              key={country.name.common} 
              country={country.name.common} 
              listSize={countriesFound.length}
              handleButtonClick={() => handleButtonClick(country)}
            />
          ))}
        </ul>
      )}
      {displayData && countriesFound.length === 1 && (
        <CountryData country={countriesFound.length === 1 ? countriesFound[0] : null} />
      )}
    </>
  );
}

export default App;