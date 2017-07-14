import axios from 'axios';
export const API_URL = 'http://localhost:3001/api/v1';
export const CLIENT_ROOT_URL = 'http://localhost:8081';



// error handler
export function errorHandler(dispatch, error, type) {
  console.log('Error type: ', type);
  console.log(error);

  let errorMessage = error.response ? error.response.data : error;

  dispatch({
    type,
    payload: errorMessage,
  });
}


// GET Request
export function getData(action, errorType, url, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {};

  axios.get(requestUrl, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}




// POST Request
export function postData(action, errorType, url, dispatch, data) {
  const requestUrl = API_URL + url;
  let headers = {};

  axios.post(requestUrl, data, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}




// PUT Request
export function putData(action, errorType, url, dispatch, data) {
  const requestUrl = API_URL + url;
  let headers = {};

  axios.put(requestUrl, data, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}





// DELETE Request
export function deleteData(action, errorType, url, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {};

  axios.delete(requestUrl, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}