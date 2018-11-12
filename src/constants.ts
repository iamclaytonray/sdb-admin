export const LOCAL_API = 'http://localhost:3000/v1';
export const PROD_API = 'https://shoreshdavidbrandon-api.herokuapp.com/v1';

export const API_URL =
  process.env.NODE_ENV === 'production' ? PROD_API : LOCAL_API;
