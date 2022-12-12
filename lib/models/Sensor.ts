import { Schema, model,models, Model } from 'mongoose';


export interface ISensor {
    timestamp: number,
    temperature: number,
    humidity: number,
}

const sensorSchema =  new Schema<ISensor>({
    timestamp: Number,
    temperature: Number,
    humidity: Number,
  });

export const Sensor: Model<ISensor> = models.Sensor || model<ISensor>('Sensor', sensorSchema)
