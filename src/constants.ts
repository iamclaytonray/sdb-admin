export const LOCAL_API = 'http://localhost:3000/graphql';
export const PROD_API =
  'http://api-shoreshdavidbrandon-dev.us-east-1.elasticbeanstalk.com/graphql';

export const API_URL =
  process.env.NODE_ENV === 'production' ? PROD_API : LOCAL_API;
