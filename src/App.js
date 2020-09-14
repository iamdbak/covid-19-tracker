import React, { useState,useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')
  // STATE = how to write a variable in React

  // https://disease.sh/v3/covid-19/countries the API site

  // USEEFFECT = Runs a piece of code 
  // based on a given condition

  useEffect(()=>{
      
      //The code inside here will run once when the app(component) loads and not again!! 
      // async -> send a request, wait for it, do something with ot later 

      const getCountriesData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json()).then((data) => {
          
          //[item1, item2, item3]
          // ^^ item1 ... -> returning an object in a shape
          // ^^  item2 .. -> returning an object in a shape
          // ^^  item3 .. -> returning an object in a shape
          const countries = data.map((country) => (
            {
              name: country.country, //United Kingdom, United States
              value: country.countryInfo.iso2 // uk,usa,fr
              }
            
            ));

            setCountries(countries);
        });
      };

      getCountriesData();
  }, [countries]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("DoneChe>>>", countryCode);

    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app_left">
          <div className="app_header">
            <h1>Covid-19 Tracker</h1>
              <FormControl className="app_dropdown">
                <Select variant="outlined" onChange={onCountryChange} value={country}>
                  <MenuItem value="worldwide">WorldWide</MenuItem> 
                  {/*Loop through the dropdown country   */}

                  {
                    countries.map(country => (<MenuItem value={country.value}>{country.name}</MenuItem>))
                  }

                  { /* <MenuItem value="worldwide">WorldWide</MenuItem>
                    <MenuItem value="worldwide">Option two</MenuItem>
                    <MenuItem value="worldwide">Option 3</MenuItem>
                    <MenuItem value="worldwide">Option 4</MenuItem> */}
                </Select>
              </FormControl>
          </div>

          <div className = "app_stats">
            <InfoBox title="CoronaVirus Cases" cases={123} total={2000}/>
            <InfoBox title="Thik hogaye" cases={1234} total={3000}/>
            <InfoBox title="Bhaiban thoda taklif" cases={12356} total={4000}/>
          </div>       
          {/*Map*/}
          <Map></Map>

      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Counrty</h3>
            {/*Table */}
          <h3>WorldWide New Cases</h3>
            {/*Graphs*/}
        </CardContent>
        
      </Card>
      
    </div>
  );
}

export default App;
