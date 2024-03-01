import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/users/authSlice"
import registerSlice from "../features/users/registerSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerSlice,
  },
})
