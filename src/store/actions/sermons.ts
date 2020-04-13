import { normalize, schema } from 'normalizr';
import { Dispatch } from 'redux';

import * as types from '../types';

const sermon = new schema.Entity('sermons', undefined, { idAttribute: '_id' });
const arrayOfSermons = new schema.Array(sermon);

export const loadSermons = (sermons: any[]) => async (dispatch: Dispatch) => {
  dispatch({
    type: types.LOAD_SERMONS,
    payload: normalize(sermons, arrayOfSermons),
  });
};

export const selectSermon = (id: string) => async (dispatch) => {
  dispatch({
    type: types.SELECT_SERMON,
    payload: id,
  });
};
