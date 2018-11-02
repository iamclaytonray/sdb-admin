import Axios from 'axios';
import { API_URL } from '../constants';

// interface DeleteProps {
//   path: string;
//   params: string;
// }

export const handleDelete = (path, params, history) => {
  const confirm = window.confirm('Are you sure?');
  if (confirm) {
    Axios.delete(`${API_URL}/${path}/${params}`)
      .then(() => history.push(`/dashboard/${path}`))
      .catch(err => console.log(err));
  }
  return alert('Item not deleted');
};
