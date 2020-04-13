import * as types from '../../store/types';

const initialState = {
  allSermons: {},
  allSermonIds: [],
  selectedSermonId: null,
};

export const sermonsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOAD_SERMONS:
      return {
        ...state,
        allSermons: action.payload.entities.sermons,
        allSermonIds: action.payload.result,
      };

    case types.SELECT_SERMON:
      return {
        ...state,
        selectedSermonId: action.payload,
      };

    default:
      return state;
  }
};
