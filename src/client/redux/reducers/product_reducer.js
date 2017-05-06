import * as types from '../actions/types';

const INITIAL_STATE = { 
  allProducts:    { products: [], error: null },
  singleProduct:  { product: {}, error: null }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    

    case types.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProduct: { product: action.payload.product, error: null }
      };


    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: { products: action.payload.products, error: null }
      };

    default:
      return state;
  }
}