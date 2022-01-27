import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/home.css';
import { ICovidDataStatewise, stateOption } from '../constants/constants';
import Select, { SingleValue } from 'react-select';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Chart.Js Initializer
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [covidData, setCovidData] = useState<ICovidDataStatewise[]>([]);
  const [showData, setShowData] = useState<Boolean>(false);
  const [currentStat, setCurrentStat] = useState<ICovidDataStatewise>({
    active: 'No Value Selected',
    confirmed: 'No Value Selected',
    deaths: 'No Value Selected',
    recovered: 'No Value Selected',
    state: 'No Value Selected',
  });
  const stateOptions: stateOption[] = [];
  const [selectedState, setSelectedState] = useState<stateOption>({
    value: 'Please Select State',
    label: 'Please Select State',
  });

  ///////////////////////////// PIE DATA /////////////////////////////////

  const data = {
    labels: ['Deaths', 'Recovered', 'Active'],
    datasets: [
      {
        label: '# of Votes',
        data: [currentStat.deaths, currentStat.recovered, currentStat.active],
        backgroundColor: ['#F70F0B', '#50F70B', '#F7B30B'],
        borderColor: ['#F70F0B', '#50F70B', '#F7B30B'],
        borderWidth: 2,
      },
    ],
  };

  // API Call for getting the data

  const getApiData = async () => {
    try {
      const res = await axios.get(`https://api.covid19india.org/data.json`);
      setCovidData(res.data.statewise);
      console.log(res.data.statewise);
    } catch (err) {
      alert(err);
    }
  };

  ///function to get the label and value object for state names from the response

  covidData.forEach((data) => {
    const obj: stateOption = {
      value: data.state,
      label: data.state,
    };
    stateOptions.push(obj);
  });

  /////////////////////////////////////////////////////

  /////function to get the label and value object for state names

  const getCovidStats = () => {
    covidData.forEach((data) => {
      if (data.state === selectedState.value) {
        setCurrentStat(data);
        setShowData(true);
      }
    });
  };

  /////////////////////////////////////////////////////

  useEffect(() => {
    getApiData();
    getCovidStats();
  }, [currentStat, selectedState]);

  // Function for changing/setting the state name
  const setStateValue = (option: SingleValue<stateOption>) => {
    setSelectedState(option as stateOption);
  };

  return (
    <>
      <header>Covid 19 Dashboard</header>
      <div className='main'>
        <h3>Select State From Below Dropdown</h3>
        <Select
          className='state-dropdown'
          defaultValue={selectedState}
          onChange={(option) => setStateValue(option)}
          options={stateOptions}
          placeholder='Select State'
        ></Select>
        {showData ? (
          <div className='state-covid-stats'>
            <div className='stat-container'>
              <h5>
                State: <span> {currentStat.state}</span>
              </h5>
              <h5>
                Total Cases: <span>{currentStat.confirmed}</span>
              </h5>
              <h5>
                Active Cases: <span>{currentStat.active}</span>
              </h5>
              <h5>
                Recovored: <span>{currentStat.recovered}</span>
              </h5>
              <h5>
                Deaths: <span>{currentStat.deaths}</span>
              </h5>
            </div>
            <div className='graph-container'>
              <Pie className='pie-chart' data={data} />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Home;
