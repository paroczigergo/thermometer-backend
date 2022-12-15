
import { router, protectedProcedure } from '../trpc';
import { createDbConnection } from '../mongodb';
import { ISensor, Sensor } from '../models/Sensor';
import { deepCopy } from '../../utils/deep-copy';


export const fetchTemperatureData = async () => {
    await createDbConnection()
    const items = await Sensor.find({}, 'outDoorTemperature outDoorHumidity inDoorTemperature inDoorHumidity timestamp')
    .skip(await Sensor.count() - 50)
    .lean();
    return deepCopy<Array<ISensor>>(items);
}

export const temperatureDataRouter = router({
    list: protectedProcedure
        .query(fetchTemperatureData),
});


