import { Schema, model,models, Model } from 'mongoose';


export interface ISensor {
    timestamp: number,
    outDoorTemperature: number,
    outDoorHumidity: number,
    inDoorTemperature: number,
    inDoorHumidity: number,
}

const sensorSchema =  new Schema<ISensor>({
    timestamp: Number,
    outDoorTemperature: Number,
    outDoorHumidity: Number,
    inDoorTemperature: Number,
    inDoorHumidity: Number,
  });

export const Sensor: Model<ISensor> = models.Sensor || model<ISensor>('Sensor', sensorSchema)
