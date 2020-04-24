import Axios from 'axios';
import { Dispatch } from 'redux';

import { API_URL } from '../constants';

const token = localStorage.getItem('token');

export const handleApiDelete = async (resource: string) => {
  try {
    const res = await Axios.delete(`${API_URL}${resource}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    history.back();

    return { success: res.data.success };
  } catch (error) {
    return { error: error?.response?.data?.message };
  }
};
