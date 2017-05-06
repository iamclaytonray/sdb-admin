import * as types from '../actions/types';

const INITIAL_STATE = { 
  allAnnouncements:    { announcements: [], error: null },
  singleAnnouncement:  { announcement: {}, error: null },
  createdAnnouncement: { announcement: null, error: null },
  updatedAnnouncement: { announcement: null, error: null },
  deletedAnnouncement: { announcement: null, error: null }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    

    case types.FETCH_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        singleAnnouncement: { announcement: action.payload.announcement, error: null }
      };


    case types.FETCH_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        allAnnouncements: { announcements: action.payload.announcements, error: null }
      };

    case types.CREATE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        createdAnnouncement: { announcement: action.payload, error: null }
      };
    

    case types.UPDATE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        updatedAnnouncement: { announcement: action.payload, error: null }
      };

    case types.DELETE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        deletedAnnouncement: { announcement: action.payload, error: null }
      }

    default:
      return state;
  }
}