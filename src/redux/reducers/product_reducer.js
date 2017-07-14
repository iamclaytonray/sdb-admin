import * as types from '../actions/types';

const INITIAL_STATE = { 
  allProducts:    { products: [], error: null },
  singleProduct:  { product: {}, error: null },
  createdProduct:  { product: null, error: null },
  updatedProduct:  { product: null, error: null },
  deletedProduct:  { product: null, error: null }
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

    case types.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        createdProduct: { product: action.payload, error: null }
      };
    

    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        updatedProduct: { product: action.payload, error: null }
      };

    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deletedProduct: { product: action.payload, error: null }
      }

    default:
      return state;
  }
}