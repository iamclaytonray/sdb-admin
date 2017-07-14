import axios from 'axios';
import * as types from './types';
import { getData, postData, putData, deleteData } from './index';



// fetch user
export function fetchUser(slug) {
  const url = `/users/${slug}`;

  return dispatch => getData(types.FETCH_USER_SUCCESS, types.FETCH_USER_FAILURE, url, dispatch);
}



// fetch users
export function fetchUsers() {
  const url = `/users`;

  return dispatch => getData(types.FETCH_USERS_SUCCESS, types.FETCH_USERS_FAILURE, url, dispatch);
}


// create user
export function createUser(name, email, password) {
  const url = `/users`;
  const data = { name, email, password };

  return dispatch => postData(types.CREATE_USER_SUCCESS, types.CREATE_USER_FAILURE, url, dispatch, data);
}


// update user
export function updateUser(name, email, password) {
  const url = `/users/${slug}`;
  const data = {};

  return dispatch => putData(types.UPDATE_USER_SUCCESS, types.UPDATE_USER_FAILURE, url, dispatch, data);
}


// delete user
export function deleteUser(slug) {
  const url = `/users/${slug}`;

  return dispatch => deleteData(types.DELETE_USER_SUCCESS, types.DELETE_USER_FAILURE, url, dispatch);
}