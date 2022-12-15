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
import { table } from 'console';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/router';
import { ChartComponent } from '../components/chart-component';
import { trpc } from '../utils/trpc';



export default function Home({ items, }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { query } = useRouter();
  const [loadedItems, setLoadedItems] = useState<Array<ISensor>>(items);
  const { isFetched, data } = trpc.hello.useQuery({ text: 'client' });



  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (query?.mock === 'true') {
      interval = setInterval(async () => {
        await postMockSensorData();
        await fecthNewData();
      }, 4000)
    }

    return () => clearInterval(interval);
  }, [query?.mock])


  const postMockSensorData = async () => {
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
  }

  const fecthNewData = async () => {
    const newItems = (await axios.get('/api/list-history')).data
    setLoadedItems(newItems)
  }

  return <ChartComponent items={loadedItems} />

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