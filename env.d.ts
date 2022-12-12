export { }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string,
      DB_NAME: string,
      WEATHER_API_KEY: string,
      WEATHER_LOCATION: string,
      WEATHER_URL: string,
      THERMOMETER_CLIENT_KEY: string,
    }
  }
}
