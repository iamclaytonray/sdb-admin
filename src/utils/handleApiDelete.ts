import Axios from 'axios';

import { API_URL } from '../constants';

import { authHeader } from './authHeader';

export const handleApiDelete = async (resource: string) => {
  try {
    const res = await Axios.delete(`${API_URL}${resource}`, authHeader);

    history.back();

    return { success: res.data.success };
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
