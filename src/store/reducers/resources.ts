import * as types from '../../store/types';

const initialState = {
  allResources: {},
  allResourceIds: [],
  selectedResourceId: null,
};

export const resourcesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOAD_RESOURCES:
      return {
        ...state,
        allResources: action.payload.entities.resources,
        allResourceIds: action.payload.result,
      };

    case types.SELECT_RESOURCE:
      return {
        ...state,
        selectedResourceId: action.payload,
      };

    default:
      return state;
  }
};
