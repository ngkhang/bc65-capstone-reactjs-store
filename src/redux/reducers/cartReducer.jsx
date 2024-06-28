import { createSlice } from '@reduxjs/toolkit';
import { GLOBAL_STATES, REDUCERS } from '../../utils/constant';

const initialState = {
  [GLOBAL_STATES.CARTS]: [],
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
    },
    deleteProduct: (state, { payload }) => {
      const newOrders = state[GLOBAL_STATES.CARTS].filter(
        (prod) => prod.productDetail.id !== payload,
      );
      state[GLOBAL_STATES.CARTS] = newOrders;
    },
    updateQtyProduct: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export const { addProductAction, deleteProduct, updateQtyProduct } =
  cartReducer.actions;

export default cartReducer.reducer;
