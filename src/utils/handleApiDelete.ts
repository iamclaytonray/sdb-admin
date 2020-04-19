import Axios from 'axios';

import { API_URL } from '../constants';

const token = localStorage.getItem('token');

export const handleApiDelete = async (resource: string) => {
  try {
    const res = await Axios.delete(`${API_URL}${resource}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: res.data.success };
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
