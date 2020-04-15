import * as types from '../../store/types';

const initialState = {
  allEvents: {},
  allEventIds: [],
  selectedEventId: null,
};

export const eventsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOAD_EVENTS:
      return {
        ...state,
        allEvents: action.payload.entities.events,
        allEventIds: action.payload.result,
      };

    case types.SELECT_EVENT:
      return {
        ...state,
        selectedEventId: action.payload,
      };

    default:
      return state;
  }
};
