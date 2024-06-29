import { createSlice } from '@reduxjs/toolkit';
import { GLOBAL_STATES, REDUCERS } from '../../utils/constant';
import { getDataJsonStorage, setDataJSONStorage } from '../../utils/helpers';
import { httpClient } from '../../utils/config';
import API from '../../utils/api';

const initialState = {
  [GLOBAL_STATES.CARTS]: getDataJsonStorage(GLOBAL_STATES.CARTS) || [],
};

const cartReducer = createSlice({
  name: REDUCERS.CART_REDUCER,
  initialState,
  reducers: {
    addProductAction: (state, { payload }) => {
      let productId = payload.productDetail.id;
      let productExists = state[GLOBAL_STATES.CARTS].find(
        (prod) => prod.productDetail.id === productId,
      );

      productExists
        ? (productExists.quantity += payload.quantity)
        : (state[GLOBAL_STATES.CARTS] = [
            ...state[GLOBAL_STATES.CARTS],
            payload,
          ]);

      setDataJSONStorage(GLOBAL_STATES.CARTS, state[GLOBAL_STATES.CARTS]);
    },
    deleteProductAction: (state, { payload }) => {
      const newOrders = state[GLOBAL_STATES.CARTS].filter(
        (prod) => prod.productDetail.id !== payload,
      );
      state[GLOBAL_STATES.CARTS] = newOrders;
      setDataJSONStorage(GLOBAL_STATES.CARTS, state[GLOBAL_STATES.CARTS]);
    },
    updateQtyProductAction: (state, { payload }) => {
      const { value, key } = payload;
      let productExists = state[GLOBAL_STATES.CARTS].find(
        (prod) => prod.productDetail.id === key,
      );
      productExists.quantity = value;
      setDataJSONStorage(GLOBAL_STATES.CARTS, state[GLOBAL_STATES.CARTS]);
    },
    checkoutAction: (state) => {
      setDataJSONStorage(GLOBAL_STATES.CARTS, []);
      state[GLOBAL_STATES.CARTS] = [];
    },
  },
});

export const {
  addProductAction,
  deleteProductAction,
  updateQtyProductAction,
  checkoutAction,
} = cartReducer.actions;

export default cartReducer.reducer;

export const checkOutActionAsync = (orders) => {
  return async (dispatch) => {
    try {
      const res = await httpClient.post(API.USER.ORDER, orders);
      const actionCreator = checkoutAction();
      dispatch(actionCreator);
      return {
        ...res.data,
      };
    } catch (error) {
      return {
        ...error.response.data,
      };
    }
  };
};
