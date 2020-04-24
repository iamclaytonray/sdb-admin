export const LOCAL_API = 'http://localhost:3000/v2';
export const PROD_API = 'https://api.shoreshdavidbrandon.org/v2';

const nodeEnv = process.env.NODE_ENV;

export const API_URL = nodeEnv === 'production' ? PROD_API : LOCAL_API;
