import axios from 'axios';
import * as types from './types';
import { getData, postData, putData, deleteData } from './index';



// fetch category
export function fetchCategory(slug) {
  const url = `/categories/${slug}`;

  return dispatch => getData(types.FETCH_CATEGORY_SUCCESS, types.FETCH_CATEGORY_FAILURE, url, dispatch);
}



// fetch categories
export function fetchCategories() {
  const url = `/categories`;

  return dispatch => getData(types.FETCH_CATEGORIES_SUCCESS, types.FETCH_CATEGORIES_FAILURE, url, dispatch);
}


// create category
export function createCategory(name, email, password) {
  const url = `/categories`;
  const data = { name, email, password };

  return dispatch => postData(types.CREATE_CATEGORY_SUCCESS, types.CREATE_CATEGORY_FAILURE, url, dispatch, data);
}


// update category
export function updateCategory(name, email, password) {
  const url = `/categories/${slug}`;
  const data = {};

  return dispatch => putData(types.UPDATE_CATEGORY_SUCCESS, types.UPDATE_CATEGORY_FAILURE, url, dispatch, data);
}


// delete category
export function deleteCategory(slug) {
  const url = `/categories/${slug}`;

  return dispatch => deleteData(types.DELETE_CATEGORY_SUCCESS, types.DELETE_CATEGORY_FAILURE, url, dispatch);
}