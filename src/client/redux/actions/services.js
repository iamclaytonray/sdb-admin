import axios from 'axios';
import * as types from './types';
import { getData, postData, putData, deleteData } from './index';



// fetch service
export function fetchService(slug) {
  const url = `/services/${slug}`;

  return dispatch => getData(types.FETCH_SERVICE_SUCCESS, types.FETCH_SERVICE_FAILURE, url, dispatch);
}



// fetch services
export function fetchServices() {
  const url = `/services`;

  return dispatch => getData(types.FETCH_SERVICES_SUCCESS, types.FETCH_SERVICES_FAILURE, url, dispatch);
}


// create service
export function createService(name, email, password) {
  const url = `/services`;
  const data = { name, email, password };

  return dispatch => postData(types.CREATE_SERVICE_SUCCESS, types.CREATE_SERVICE_FAILURE, url, dispatch, data);
}


// update service
export function updateService(name, email, password) {
  const url = `/services/${slug}`;
  const data = {};

  return dispatch => putData(types.UPDATE_SERVICE_SUCCESS, types.UPDATE_SERVICE_FAILURE, url, dispatch, data);
}


// delete service
export function deleteService(slug) {
  const url = `/services/${slug}`;

  return dispatch => deleteData(types.DELETE_SERVICE_SUCCESS, types.DELETE_SERVICE_FAILURE, url, dispatch);
}