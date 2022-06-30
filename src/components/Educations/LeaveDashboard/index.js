import React from 'react'
import './index.css';
import Header from '../Header';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'; 
const TimeTable = () => {
    const options = {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'My chart'
        },
        series: [
          {
            data: [1, 2, 1, 4, 3, 6]
          }
        ]
      };
      const options2 = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'My chart'
        },
        series: [
          {
            data: [1, 2, 1, 4, 3, 6]
          }
        ]
      };
    return (<>
        <Header />
        <div className="highcharts ">
        <HighchartsReact  highcharts={Highcharts} options={options} />
        <HighchartsReact  highcharts={Highcharts} options={options2} />
        </div>
    </>)
}

export default TimeTable;