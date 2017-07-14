import axios from 'axios';
import * as types from './types';
import { getData, postData, putData, deleteData } from './index';



// fetch product
export function fetchProduct(slug) {
  const url = `/products/${slug}`;

  return dispatch => getData(types.FETCH_PRODUCT_SUCCESS, types.FETCH_PRODUCT_FAILURE, url, dispatch);
}



// fetch products
export function fetchProducts() {
  const url = `/products`;

  return dispatch => getData(types.FETCH_PRODUCTS_SUCCESS, types.FETCH_PRODUCTS_FAILURE, url, dispatch);
}


// create product
export function createPost(title, slug, content) {
  const url = `/products`;
  const data = { title, slug, content };

  return dispatch => postData(types.CREATE_POST_SUCCESS, types.CREATE_POST_FAILURE, url, dispatch, data);
}


// update product
export function updateProduct(slug, title, content) {
  const url = `/products/${slug}`;
  const data = {};

  return dispatch => putData(types.UPDATE_POST_SUCCESS, types.UPDATE_POST_FAILURE, url, dispatch, data);
}


// delete product
export function deleteProduct(slug) {
  const url = `/products/${slug}`;

  return dispatch => deleteData(types.DELETE_POST_SUCCESS, types.DELETE_POST_FAILURE, url, dispatch);
}