import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createDbConnection } from '../../lib/mongodb';
import { Sensor, ISensor } from '../../lib/models/Sensor';
import { L } from 'chart.js/dist/chunks/helpers.core';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const clientKey = req.query?.key;

  if (!clientKey || clientKey !== process.env.THERMOMETER_CLIENT_KEY) {
    res.status(401).send({ error: 'Client key is not provided or not valid' })
    return;
  }


  const inDoorResult: { humidity: number, temperature: number, timestamp: number } = req.body;

  if (req.headers['content-type']!== 'application/json' || !inDoorResult || !inDoorResult.humidity || !inDoorResult.temperature || !inDoorResult.timestamp) {
    res.status(400).send({ error: 'Required elements:  humidity, temperature, timestamp in application/json body' })
    return
  }


  if (req.method !== 'POST') {
    res.status(405).send({ error: 'Only POST requests allowed' })
    return;
  }


  const outDoorResult = await axios({
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
      return {
        outDoorTemperature: response?.current?.temp_c,
        outDoorHumidity: response?.current?.humidity,
      }
    })
    .catch((error) => {
      return null
    })

  if (!!outDoorResult) {

    await createDbConnection()


    const newItem = new Sensor({
      timestamp: inDoorResult.timestamp,
      outDoorTemperature: outDoorResult.outDoorTemperature,
      outDoorHumidity: outDoorResult.outDoorHumidity,
      inDoorTemperature: inDoorResult.temperature,
      inDoorHumidity: inDoorResult.humidity,
    });
    await newItem.save()

  }



  res.status(200).json({ message: 'Sensor data has been saved' })
}

