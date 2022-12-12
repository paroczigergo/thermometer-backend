import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createDbConnection } from '../../lib/mongodb';
import { Sensor, ISensor } from '../../lib/models/Sensor';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const clientKey = req.query?.key;

  if (!clientKey || clientKey !== process.env.THERMOMETER_CLIENT_KEY) {
    res.status(401).send({ message: 'Client key is not provided or not valid' })
    return;
  }


  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return;
  }


  const result = await axios({
    url: process.env.WEATHER_URL,
    params: {
      key: process.env.WEATHER_API_KEY,
      q: process.env.WEATHER_LOCATION,
    },

    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip'
    },
    decompress: true
  })
    .then((response) => response.data)
    .then((response) => {
      const timestamp = response?.current?.last_updated_epoch
      return {
        temperature: response?.current?.temp_c,
        humidity: response?.current?.humidity,
        timestamp: timestamp,
      }
    })
    .catch((error) => {
      return null
    })

  if (!!result) {

    await createDbConnection()


    const newItem = new Sensor({
      temperature: result.temperature,
      humidity: result.humidity,
      timestamp: result.timestamp,
    });
    await newItem.save()

  }



  res.status(200).json({ message: 'Sensor data has been saved' })
}

