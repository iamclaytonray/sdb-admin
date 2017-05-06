import * as types from '../actions/types';

const INITIAL_STATE = { 
  allPosts:    { posts: [], error: null },
  singlePost:  { post: {}, error: null },
  createdPost: { post: null, error: null },
  updatedPost: { post: null, error: null },
  deletedPost: { post: null, error: null }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    

    case types.FETCH_POST_SUCCESS:
      return {
        ...state,
        singlePost: { post: action.payload.post, error: null }
      };


    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        allPosts: { posts: action.payload.posts, error: null }
      };

    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        createdPost: { post: action.payload, error: null }
      };
    

    case types.UPDATE_POST_SUCCESS:
      return {
        ...state,
        updatedPost: { post: action.payload, error: null }
      };

    case types.DELETE_POST_SUCCESS:
      return {
        ...state,
        deletedPost: { post: action.payload, error: null }
      }

    default:
      return state;
  }
}