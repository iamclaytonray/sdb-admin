import * as types from '../actions/types';

const INITIAL_STATE = { 
  allServices:     { services: [], error: null },
  singleService:   { service: {}, error: null },
  createdService:  { service: null, error: null },
  updatedService:  { service: null, error: null },
  deletedService:  { service: null, error: null }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    

    case types.FETCH_SERVICE_SUCCESS:
      return {
        ...state,
        singleService: { service: action.payload.service, error: null }
      };


    case types.FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        allServices: { services: action.payload.services, error: null }
      };

    case types.CREATE_SERVICE_SUCCESS:
      return {
        ...state,
        createdService: { service: action.payload, error: null }
      };
    

    case types.UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        updatedService: { service: action.payload, error: null }
      };

    case types.DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        deletedService: { service: action.payload, error: null }
      }

    default:
      return state;
  }
}