import { InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';
import { ISensor } from '../lib/models/Sensor';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/router';
import { ChartComponent } from '../components/chart-component';
import { trpc } from '../utils/trpc';
import { fetchTemperatureData } from '../lib/routers/temperature-data';


export default function Home({ items, }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { query } = useRouter();
  const [loadedItems, setLoadedItems] = useState<Array<ISensor>>(items);
  const { data, refetch } = trpc.temperatureData.list.useQuery();


  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (query?.mock === 'true') {
      interval = setInterval(async () => {
        await postMockSensorData();
        await refetch()
      }, 5000)
    }

    return () => clearInterval(interval);
  }, [query?.mock])

  useEffect(() => {
    if (data) {
      setLoadedItems(data)
    }
  }, [data])


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


  return <ChartComponent items={loadedItems} />

}



export async function getServerSideProps() {

  try {

    return {
      props: { items: await fetchTemperatureData() },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { items: [] },
    }
  }
}