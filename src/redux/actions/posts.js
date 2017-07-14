import axios from 'axios';
import * as types from './types';
import { getData, postData, putData, deleteData } from './index';



// fetch post
export function fetchPost(slug) {
  const url = `/posts/${slug}`;

  return dispatch => getData(types.FETCH_POST_SUCCESS, types.FETCH_POST_FAILURE, url, dispatch);
}



// fetch posts
export function fetchPosts() {
  const url = `/posts`;

  return dispatch => getData(types.FETCH_POSTS_SUCCESS, types.FETCH_POSTS_FAILURE, url, dispatch);
}


// create post
export function createPost(title, slug, content) {
  const url = `/posts`;
  const data = { title, slug, content };

  return dispatch => postData(types.CREATE_POST_SUCCESS, types.CREATE_POST_FAILURE, url, dispatch, data);
}


// update post
export function updatePost(slug, title, content) {
  const url = `/posts/${slug}`;
  const data = {};

  return dispatch => putData(types.UPDATE_POST_SUCCESS, types.UPDATE_POST_FAILURE, url, dispatch, data);
}


// delete post
export function deletePost(slug) {
  const url = `/posts/${slug}`;

  return dispatch => deleteData(types.DELETE_POST_SUCCESS, types.DELETE_POST_FAILURE, url, dispatch);
}