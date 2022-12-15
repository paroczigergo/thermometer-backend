
import { router, protectedProcedure } from '../trpc';
import { createDbConnection } from '../mongodb';
import { ISensor, Sensor } from '../models/Sensor';
import { deepCopy } from '../../utils/deep-copy';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import axios from 'axios';

export const fetchTemperatureData = async () => {
    await createDbConnection()

    const itemCount = await Sensor.count();
    const items = await Sensor.find({}, 'outDoorTemperature outDoorHumidity inDoorTemperature inDoorHumidity timestamp')
        .skip(itemCount < 50 ? 0 : 50)
        .lean();
    return deepCopy<Array<ISensor>>(items);
}


const fetchPublicWeatherAPI = async () => {
    return axios({
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
    }).then((response) => response.data)
        .then((response) => {
            return {
                outDoorTemperature: response?.current?.temp_c,
                outDoorHumidity: response?.current?.humidity,
            }
        })
        .catch((error) => {
            console.error(error)
            return null
        })
}

const saveTemperatureData = async ({ humidity, temperature, timestamp }:
    { humidity: number, temperature: number, timestamp: number }) => {

    const outDoorResult = await fetchPublicWeatherAPI();

    if (!!outDoorResult) {

        await createDbConnection()

        const newItem = new Sensor({
            timestamp: timestamp,
            outDoorTemperature: outDoorResult.outDoorTemperature,
            outDoorHumidity: outDoorResult.outDoorHumidity,
            inDoorTemperature: temperature,
            inDoorHumidity: humidity,
        });

        await newItem.save()
    }
}

export const temperatureDataRouter = router({
    list: protectedProcedure
        .query(fetchTemperatureData),
    save: protectedProcedure
        .input(
            z.object({
                clientKey: z.string(),
                humidity: z.number(),
                temperature: z.number(),
                timestamp: z.number(),
            }),
        )
        .mutation(async ({ input }) => {


            if (!input?.clientKey || input.clientKey !== process.env.THERMOMETER_CLIENT_KEY) {

                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Client key is not provided or not valid'
                });
            }

            await saveTemperatureData(input)
            return { message: 'Sensor data has been saved' }
        })
});

