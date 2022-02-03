import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/home.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { IStateObj, IStateResponse } from '../constants/constants';
import MainView from '../components/MainView';


// Chart.Js Initializer
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [stateNames, setStateNames] = useState<[]>([])
  let stateObj:Array<IStateObj> = []

  const getStateNames = async() => {
    try{
      const res = await axios.get("https://covidtracking.com/api/states/info")
      setStateNames(res.data) 
    }
    catch(err){
      alert(err)
    }
  }

  useEffect(() => {
    
    getStateNames()
  },[])


  // eslint-disable-next-line no-lone-blocks

  // Code for getting all the state names to show in dropdown
  {
    if(stateNames.length > 0){
      stateNames.forEach((obj:IStateResponse, i) => {
        stateObj[i] = {
          value: obj.state,
          label: obj.name,
      };
      })
    }
  }
  
  return (
    <> 
       <header>Covid 19 Dashboard</header>
       <div className='main'>
               <MainView stateNames={stateObj} />  
       </div>
       </>
  );
};

export default Home;
