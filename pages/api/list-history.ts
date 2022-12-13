import type { NextApiRequest, NextApiResponse } from 'next'
import { createDbConnection } from '../../lib/mongodb';
import { Sensor, ISensor } from '../../lib/models/Sensor';
import { getSession } from 'next-auth/react';
import { L } from 'chart.js/dist/chunks/helpers.core';


export async function getSensorHistoryList(): Promise<Array<ISensor>> {

  await createDbConnection()
  const items = await Sensor.find({}, 'outDoorTemperature outDoorHumidity inDoorTemperature inDoorHumidity timestamp').lean();
  return deepCopy(items);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'GET') {
    res.status(405).send({ error: 'Only GET requests allowed' })
    return
  }

  const session = await getSession({req})

  if (!session) {
    res.status(401).send({ error: 'Sign in is required' })
    return
  }


  res.status(200).json(await getSensorHistoryList())
}


const deepCopy = (data: any) => JSON.parse(JSON.stringify(data))