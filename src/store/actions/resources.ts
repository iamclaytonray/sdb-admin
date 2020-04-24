import { normalize, schema } from 'normalizr';
import { Dispatch } from 'redux';

import * as types from '../types';

const resource = new schema.Entity('resources');
const arrayOfResources = new schema.Array(resource);

export const loadResources = (resources: any[]) => async (
  dispatch: Dispatch,
) => {
  dispatch({
    type: types.LOAD_RESOURCES,
    payload: normalize(resources, arrayOfResources),
  });
};

export const selectResource = (id: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: types.SELECT_RESOURCE,
    payload: id,
  });
};
