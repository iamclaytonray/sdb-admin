import { normalize, schema } from 'normalizr';
import { Dispatch } from 'redux';

import * as types from '../types';

const event = new schema.Entity('events');
const arrayOfEvents = new schema.Array(event);

export const loadEvents = (events: any[]) => async (dispatch: Dispatch) => {
  dispatch({
    type: types.LOAD_EVENTS,
    payload: normalize(events, arrayOfEvents),
  });
};

export const selectEvent = (id: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: types.SELECT_EVENT,
    payload: id,
  });
};
