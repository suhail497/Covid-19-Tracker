import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider, Typography, FormControl, Select, MenuItem, CardContent, Card } from '@material-ui/core';
import theme from "./Theme"
import { useStyles } from './appstyles';
import InfoBox from './components/Infobox/InfoBox';
import Table from './components/Table/Table';
import { sortData, prettyPrintStat } from './utlils';
import LineChart from './components/LineChart/LineChart';
import Map from './components/Map/Map';
// import "leaflet\dist\leaflet.css"
import "leaflet/dist/leaflet.css"


// https://disease.sh/v3/covid-19/countries


const App = () => {
  const classes = useStyles()
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide') //this for drop down using menu and select options
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  // for map use in leaflet
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)
  // to show the data in the map
  const [mapCountries, setMapCountries] = useState([])
  // for change the color 
  const [casesType, setCasesType] = useState('cases')

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
          // for showing the circles in the map
          setMapCountries(data)

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
        // const sorting = sortData(data)
        setCountry(countryCode);
        setCountryInfo(data);
        // for map
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);

      });
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
            <InfoBox
              isRed
              onClick={e => setCasesType('cases')}
              active={casesType === 'cases'}

              title='Today Covid Cases' cases={prettyPrintStat(countryInfo.todayCases).toLocaleUpperCase()} total={prettyPrintStat(countryInfo.cases).toLocaleUpperCase()} />
            <InfoBox
              onClick={e => setCasesType('recovered')}
              active={casesType === 'recovered'}
              title='Today Recovered' cases={prettyPrintStat(countryInfo.todayRecovered).toLocaleUpperCase()} total={prettyPrintStat(countryInfo.recovered).toLocaleUpperCase()} />
            <InfoBox
              onClick={e => setCasesType('deaths')}
              active={casesType === 'deaths'}
              isRed
              title='Today Deaths' cases={prettyPrintStat(countryInfo.todayDeaths).toLocaleUpperCase()} total={prettyPrintStat(countryInfo.deaths).toLocaleUpperCase()} />
          </div>
          <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>


        <Card className={classes.apppright}>

          <CardContent>
            <Typography variant="h6" >
              Live cases by Country
                      </Typography>
            <Table countries={tableData} />
            <Typography variant="h6" >

              World Wide {casesType} New cases
                </Typography>
            <LineChart casesType={casesType}
              active={casesType === 'recovered'}
            />
          </CardContent>
        </Card>

      </ThemeProvider>
    </div>
  );
}

export default App;


