import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider, Typography, FormControl, Select, MenuItem } from '@material-ui/core';
import theme from "./Theme"
import { useStyles } from './appstyles';


// https://disease.sh/v3/covid-19/countries


const App = () => {
  const classes = useStyles()
  const [countries, setCountries] = useState(['India', 'Srilanka'])

  // use

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ))
          setCountries(countries);
        });

    };
    getCountriesData()

  }, [])


  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <div className={classes.appheader}>
          <Typography variant="h6" color="primary">Covid Tracker</Typography>
          <FormControl>
            <Select
              variant="outlined"
              value="abe">
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>


          </FormControl>
        </div>



      </ThemeProvider>
    </div>
  );
}

export default App;


