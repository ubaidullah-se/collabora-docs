import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accessTokenReducer from "./slices/access-token-slice";
import loadingReducer from "./slices/loading-slice";
import userReducer from "./slices/user-slice";

const reducers = {
  accessToken: accessTokenReducer,
  isLoading: loadingReducer,
  user: userReducer,
};

const rootReducer = (state: any, action: any) => {
  if (action.type === "user/logoutUser") {
    localStorage.clear();
    state = undefined;
  }
  return combineReducers(reducers)(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type ReduxStoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
