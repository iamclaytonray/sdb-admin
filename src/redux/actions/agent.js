import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

const requests = {
  get: url => axios.get(`${API_URL}/${REQ_URL}`).then(responseBody),
  post: url => axios.post(`${API_URL}/${REQ_URL}`).then(responseBody),
  put: url => axios.put(`${API_URL}/${REQ_URL}`).then(responseBody),
  delete: url => axios.delete(`${API_URL}/${REQ_URL}`).then(responseBody),
};


const Posts = {
  all: () => requests.get(`/posts`),
  delete: slug => requests.delete(`/posts/${slug}`),
}

export default {
  Posts,
}