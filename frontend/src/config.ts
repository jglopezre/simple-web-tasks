import { Config } from "./types";

const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL,
  port: import.meta.env.VITE_APP_PORT,
  protocol: import.meta.env.VITE_APP_PROTOCOL,
  isProduction: import.meta.env.MODE === 'production',
}

export default config;