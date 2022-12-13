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
import { signIn, signOut, useSession } from 'next-auth/react';
import { table } from 'console';
import { faker } from '@faker-js/faker';

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

  const { data: session, status } = useSession();
  const [data, setData] = useState<ChartData<'line'>>()

  useEffect(() => {
    let interval: any;
    if (status !== 'loading' && session) {
      updateChart(items)

      interval = setInterval(async () => {

        await axios.post(`/api/save-sensor-data?key=${process.env.NEXT_PUBLIC_CLIENT_ID}`, {
          humidity: faker.datatype.float({
            min: 20,
            max: 40
          }),
          temperature: faker.datatype.float({
            min: -5,
            max: 5
          }),
          timestamp: Date.now() / 1000
        });
        const newItems = (await axios.get('/api/list-history')).data
        updateChart(newItems)

      }, 5000)
    }

    return () => clearInterval(interval);
  }, [session])


  const updateChart = (newItems: Array<ISensor>) => {
    const lineData = {
      labels: newItems.map(item => new Date(item.timestamp * 1000).toISOString()),
      datasets: [
        {
          label: 'OutDoorTemperature',
          data: newItems.map(item => item.outDoorTemperature),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'OutDoorHumidity',
          data: newItems.map(item => item.outDoorHumidity),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'InDoorTemperature',
          data: newItems.map(item => item.inDoorTemperature),
          borderColor: 'rgb(255, 40, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'InDoorHumidity',
          data: newItems.map(item => item.inDoorHumidity),
          borderColor: 'rgb(53, 162, 40)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ]
    }

    setData(lineData)
  }

  if(status === 'loading'){
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <div className='max-h-screen w-full'>
        {data ? <Line options={options} data={data} /> : 'Loading...'}
      </div>
    )
  }
  return <>
    Not signed in <br />
    <button onClick={() => signIn()}>Sign in</button>
  </>



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