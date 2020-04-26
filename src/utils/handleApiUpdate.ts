import Axios from 'axios';

import { API_URL } from '../constants';

import { authHeader } from './authHeader';

export const handleApiUpdate = async (resource: string, data: any) => {
  try {
    const res = await Axios.put(`${API_URL}${resource}`, data, authHeader);

    history.back();

    return { success: res.data.success };
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
