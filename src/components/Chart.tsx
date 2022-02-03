import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ICovidData } from '../constants/constants';
import "../styles/component styles/Chart.css"

type Props = {
  covidData: ICovidData;
};

// Chart.Js Initializer
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart: React.FC<Props> = ({ covidData}) => {
  const data = {
    labels: ['deaths','positive', 'hospitalized' ],
    datasets: [
      {
        label: '# of Votes',
        data: [ covidData.death, covidData.positive, covidData.hospitalized,],
        backgroundColor: ['#F70F0B', '#50F70B', '#F7B30B'],
        borderColor: ['#F70F0B', '#50F70B', '#F7B30B'],
        borderWidth: 2,
      },
    ],
    weight:10
  };

  return (
    <div>
      <Pie className='pie-chart' data={data} />
      <div className='display-info'>
        <h4>Positive Cases : {covidData.positive}</h4>
        <h4>Hospitalized Cases : {covidData.hospitalized}</h4>
        <h4>Death Cases : {covidData.death}</h4>
      </div>
    </div>
  );
};

export default Chart;
