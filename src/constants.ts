export const LOCAL_API = 'http://localhost:3000/v2';
export const STAGING_API = 'https://staging-sdb-api.herokuapp.com/';
export const PROD_API = 'https://api.shoreshdavidbrandon.org/v1';

const nodeEnv = process.env.NODE_ENV;

export const API_URL =
  nodeEnv === 'production'
    ? PROD_API
    : nodeEnv === 'staging'
    ? STAGING_API
    : LOCAL_API;
