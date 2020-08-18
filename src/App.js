import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider, Typography, FormControl, Select, MenuItem, CardContent, Card } from '@material-ui/core';
import theme from "./Theme"
import { useStyles } from './appstyles';
import InfoBox from './components/Infobox/InfoBox';
import Table from './components/Table/Table';
import { sortData } from './utlils';



// https://disease.sh/v3/covid-19/countries


const App = () => {
  const classes = useStyles()
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide') //this for drop down using menu and select options
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])


  // for worldwide case
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(res => res.json())
      .then(data => {
        setCountryInfo(data)
      })

  }, [])



  // for countries
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

          // for sorting 
          const sorting = sortData(data)
          setCountries(countries);
          // setTableData(data)
          setTableData(sorting)

        });

    };
    getCountriesData()

  }, [])


  // country chnage
  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    // console.log(countryCode)
    // setCountry(countryCode)

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        const sorting = sortData(data)

        setCountry(countryCode);
        setCountryInfo(data);
      })
  }
  console.log('country', countryInfo)



  return (
    <div className={classes.app}>
      <ThemeProvider theme={theme}>
        <div className={classes.appleft}>
          <div className={classes.appheader}>
            <Typography variant="h6" color="primary">Covid Tracker</Typography>
            <FormControl className={classes.appdropdown}>
              <Select variant="outlined" value={country} onChange={onCountryChange}>
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country, i) => (
                  <MenuItem key={i} value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.appstats}>
            <InfoBox title='Total no of cases' cases={countryInfo.todayCases} total={countryInfo.cases} />
            <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
            <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
          </div>
        </div>
        <Card className={classes.apppright}>

          <CardContent>
            <Typography variant="h6" >
              Live cases by Country
                      </Typography>
            <Table countries={tableData} />
            <Typography variant="h6" >
              World Wide New cases
                </Typography>

          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
}

export default App;


