import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';

const store = configureStore({
  reducer: {
    userReducer,
    cartReducer,
  },
});

export default store;
