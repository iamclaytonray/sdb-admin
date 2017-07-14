import axios from 'axios';
import * as types from './types';
import { getData, postData, putData, deleteData } from './index';



// fetch announcement
export function fetchAnnouncement(slug) {
  const url = `/announcements/${slug}`;

  return dispatch => getData(types.FETCH_ANNOUNCEMENT_SUCCESS, types.FETCH_ANNOUNCEMENT_FAILURE, url, dispatch);
}



// fetch announcements
export function fetchAnnouncements() {
  const url = `/announcements`;

  return dispatch => getData(types.FETCH_ANNOUNCEMENTS_SUCCESS, types.FETCH_ANNOUNCEMENTS_FAILURE, url, dispatch);
}


// create announcement
export function createAnnouncement(slug, title, content) {
  const url = `/announcements`;
  const data = { slug, title, content };

  return dispatch => postData(types.CREATE_ANNOUNCEMENT_SUCCESS, types.CREATE_ANNOUNCEMENT_FAILURE, url, dispatch, data);
}


// update announcement
export function updateAnnouncement(slug, title, content) {
  const url = `/announcements/${slug}`;
  const data = {};

  return dispatch => putData(types.UPDATE_ANNOUNCEMENT_SUCCESS, types.UPDATE_ANNOUNCEMENT_FAILURE, url, dispatch, data);
}


// delete announcement
export function deleteAnnouncement(slug) {
  const url = `/announcements/${slug}`;

  return dispatch => deleteData(types.DELETE_USER_SUCCESS, types.DELETE_USER_FAILURE, url, dispatch);
}