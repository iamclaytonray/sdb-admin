const token = localStorage.getItem('token');

export const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
