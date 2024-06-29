import { createSlice } from '@reduxjs/toolkit';
import { httpClient } from '../../utils/config';
import API from '../../utils/api';
import { SERVICES, REDUCERS, GLOBAL_STATES } from '../../utils/constant';

import {
  getDataJsonStorage,
  getDataTextStorage,
  setDataJSONStorage,
  setDataTextStorage,
} from '../../utils/helpers';

const initialState = {
  [SERVICES.ACCESS_TOKEN]: getDataTextStorage(SERVICES.ACCESS_TOKEN),
  [GLOBAL_STATES.USER_PROFILE]: null,
};

const userReducer = createSlice({
  name: [REDUCERS.USER_REDUCER],
  initialState,
  reducers: {
    signInAction: (state, { payload }) => {
      state[SERVICES.ACCESS_TOKEN] = payload;
    },
    profileAction: (state, { payload }) => {
      state.userProfile = payload;
    },
    signOutAction: (state) => {
      localStorage.removeItem(SERVICES.ACCESS_TOKEN);
      localStorage.removeItem(GLOBAL_STATES.USER_PROFILE);
      state.userProfile = getDataJsonStorage(GLOBAL_STATES.USER_PROFILE);
      state.accessToken = getDataTextStorage(SERVICES.ACCESS_TOKEN);
    },
  },
});

export const { signInAction, signOutAction, profileAction } =
  userReducer.actions;

export const signInActionAsync = (values) => {
  return async (dispatch) => {
    try {
      const res = await httpClient.post(API.USER.SIGNIN, values);
      const token = res.data.content[SERVICES.ACCESS_TOKEN];
      setDataTextStorage(SERVICES.ACCESS_TOKEN, token);

      const actionCreator = signInAction(token);
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

export const profileActionAsync = (values) => {
  return async (dispatch) => {
    try {
      const res = await httpClient.post(API.USER.PROFILE, values);
      const userInfo = res.data.content;

      setDataJSONStorage(GLOBAL_STATES.USER_PROFILE, userInfo);

      const actionCreator = profileAction(userInfo);
      dispatch(actionCreator);
    } catch (error) {
      return {
        ...error.response.data,
      };
    }
  };
};

export const signUpActionAsync = (values) => {
  return async (dispatch) => {
    try {
      const res = await httpClient.post(API.USER.SIGNUP, values);
      const login = {
        email: res.data.content.email,
        password: res.data.content.password,
      };
      const actionSignInAsync = signInActionAsync(login);
      await dispatch(actionSignInAsync);
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

export const updateActionAsync = (values) => {
  return async () => {
    try {
      const res = await httpClient.post(API.USER.UPDATE_PROFILE, values);
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

export const changePasswordActionAsync = (newPassword) => {
  return async () => {
    try {
      const res = await httpClient.post(API.USER.CHANGE_PASSWORD, newPassword);
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

export default userReducer.reducer;
