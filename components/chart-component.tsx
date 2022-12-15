import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { ISensor } from '../lib/models/Sensor';
import { Loading } from './icons/loading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
        maxRotation: 90,
        minRotation: 90
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Thermometer',
    },
  },
};


export const ChartComponent = ({ items }: { items: Array<ISensor> }) => {

  const [chartData, setChartData] = useState<ChartData<'line'>>();


  useEffect(() => {
    updateChart(items)
  }, [items])

  const updateChart = (newItems: Array<ISensor>) => {
    const lineData = {
      labels: newItems.map(item => new Date(item.timestamp * 1000).toISOString().substring(0, 16)),
      datasets: [
        {
          label: 'OutDoorTemperature',
          data: newItems.map(item => item.outDoorTemperature),
          borderColor: 'rgb(3, 0, 248)',
          backgroundColor: 'rgba(3, 0, 248, 0.5)',
        },
        {
          label: 'OutDoorHumidity',
          data: newItems.map(item => item.outDoorHumidity),
          borderColor: 'rgb(0, 126, 3)',
          backgroundColor: 'rgba(0, 126, 3 0.5)',
        },
        {
          label: 'InDoorTemperature',
          data: newItems.map(item => item.inDoorTemperature),
          borderColor: 'rgb(3, 156, 254)',
          backgroundColor: 'rgba(3, 156, 254, 0.5)',
        },
        {
          label: 'InDoorHumidity',
          data: newItems.map(item => item.inDoorHumidity),
          borderColor: 'rgb(1, 255, 1)',
          backgroundColor: 'rgba(1, 255, 1, 0.5)',
        },
      ]
    }

    setChartData(lineData)
  }

  return <> {chartData ? <Line className='sm:m-10 md:m-20 lg:m-32 xl:m-48' options={options} data={chartData} /> : <Loading />}</>

}