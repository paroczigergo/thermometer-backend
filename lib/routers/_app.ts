import {router } from '../trpc';


import {temperatureDataRouter} from './temperature-data';

export const appRouter = router({
  temperatureData: temperatureDataRouter,
});
 
export type AppRouter = typeof appRouter;