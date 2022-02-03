import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ICovidData, IStateObj } from '../constants/constants';
import Dropdown from './Dropdown';
import Chart from "./Chart"
import "../styles/component styles/MainView.css"

type Props = {
  stateNames: Array<IStateObj>;
};

const MainView: React.FC<Props> = ({ stateNames }) => {

  const initialdata = {
    "positive":0,
    "death":0,
   "hospitalized":0
  }

  const [stateName, setStateName] = useState<string>('');
  const [covidData, setCovidData] = useState<ICovidData>(initialdata)
  const [viewChart,setViewChart]= useState<boolean>(false)

  const getStateName = (state: string): void => {
    setStateName(state);
  };

  const getStateWiseData = async(state: string) => {
    try {
        const res = await axios.get(`https://api.covidtracking.com/v1/states/${state}/current.json?state=${state}`)
        console.log(res);     
        setCovidData(res.data)
        setViewChart(true)
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if(stateName.length > 0){
        getStateWiseData(stateName.toLowerCase());
    }
  }, [stateName]);
  

  return (
    <>
      <Dropdown stateNames={stateNames} getStateName={getStateName} />
     {
       viewChart ? 
       <div className='pie-chart-1'>
       <Chart covidData={covidData}/>
       </div>
       :
       null
     }
     
    </>
  );
};

export default MainView;
