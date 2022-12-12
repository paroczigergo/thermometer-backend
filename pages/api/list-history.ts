import type { NextApiRequest, NextApiResponse } from 'next'
import { createDbConnection } from '../../lib/mongodb';
import { Sensor, ISensor } from '../../lib/models/Sensor';


export async function getSensorHistoryList(): Promise<Array<ISensor>> {

  await createDbConnection()
  const items = await Sensor.find({}, 'temperature humidity timestamp').lean();
  return deepCopy(items);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' })
    return
  }


  res.status(200).json(await getSensorHistoryList())
}


const deepCopy = (data: any) => JSON.parse(JSON.stringify(data))