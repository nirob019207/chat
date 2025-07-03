import { combineReducers } from "@reduxjs/toolkit";
import baseApi from "../api/baseApi";
import authReducer from "@/redux/features/auth/authSlice";
import chartDurationReducer from "@/redux/features/dashboard/dashboardSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  dashboard: chartDurationReducer
});

export default rootReducer;
