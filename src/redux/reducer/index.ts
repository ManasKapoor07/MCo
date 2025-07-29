import { combineReducers } from "@reduxjs/toolkit";
import { apiReducer } from "../api"

const rootReducer = combineReducers({
  rootApi: apiReducer.reducer,
});

export default rootReducer;
