import Axios from 'axios';

import { API_URL } from '../constants';

const token = localStorage.getItem('token');

export const handleApiUpdate = async (resource: string, data: any) => {
  try {
    const res = await Axios.put(`${API_URL}${resource}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: res.data.success };
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
