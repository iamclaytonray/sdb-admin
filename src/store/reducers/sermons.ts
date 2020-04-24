// import { normalize } from 'normalizr';

import * as types from '../../store/types';

const initialState = {
  allSermons: {},
  selectedSermonId: null,
};

export const sermonsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOAD_SERMONS:
      return {
        ...state,
        allSermons: action.payload.entities.sermons,
      };

    case types.SELECT_SERMON:
      return {
        ...state,
        selectedSermonId: action.payload,
      };

    // case types.CREATE_SERMON:
    //   return {
    //     ...state,
    //     allSermons: {
    //       ...state.allSermons,
    //     }
    //   };

    // case types.UPDATE_SERMON:
    //   return {
    //     ...state,
    //   };

    case types.DELETE_SERMON:
      delete state.allSermons[action.payload.id];
      return {
        ...state,
      };

    default:
      return state;
  }
};
