import axios from 'axios';

const defaultInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const rawInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const strapiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const fantvInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FANTV_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default defaultInstance;
