import * as types from '../actions/types';

const INITIAL_STATE = { 
  allCategories:    { categories: [], error: null },
  singleCategory:   { category: {}, error: null },
  createdCategory:  { category: null, error: null },
  updatedCategory:  { category: null, error: null },
  deletedCategory:  { category: null, error: null }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    

    case types.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        singleCategory: { category: action.payload.category, error: null }
      };


    case types.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        allCategories: { announcements: action.payload.categories, error: null }
      };

    case types.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        createdCategory: { category: action.payload, error: null }
      };
    

    case types.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        updatedCategory: { category: action.payload, error: null }
      };

    case types.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deletedCategory: { category: action.payload, error: null }
      }

    default:
      return state;
  }
}