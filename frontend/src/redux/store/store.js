import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../action/authSlice"
import registerSlice from "../action/registerSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerSlice,
  },
})
