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
import { InferGetServerSidePropsType } from 'next';
import { getSensorHistoryList } from './api/list-history';
import { useEffect, useState } from 'react';
import { ISensor } from '../lib/models/Sensor';
import axios from 'axios';

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




export default function Home({
  items,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [data, setData] = useState<ChartData<'line'>>()

  useEffect(() => {
    updateChart(items)

    setInterval(async () => {

      await axios.get('/api/save-sensor-data');
      const newItems = (await axios.get('/api/list-history')).data
      updateChart(newItems)

    }, 1000*60)

  }, [])


  const updateChart = (newItems: Array<ISensor>) => {
    const lineData = {
      labels: newItems.map(item => new Date(item.timestamp * 1000).toISOString()),
      datasets: [
        {
          label: 'Temperature',
          data: newItems.map(item => item.temperature),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Humidity',
          data: newItems.map(item => item.humidity),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ]
    }

    setData(lineData)
  }

  return (
    <div className='max-h-screen w-full'>
      {data ? <Line options={options} data={data} /> : 'Loading...'}
    </div>
  )
}



export async function getServerSideProps() {
  try {

    return {
      props: { items: await getSensorHistoryList() },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { items: [] },
    }
  }
}