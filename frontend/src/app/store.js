

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import enrolReducer from "../features/enrol/enrolSlice.js";
import paymentReducer from "../features/payments/paymentSlice";
import { api } from "../services/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    enrol: enrolReducer,
    payments: paymentReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
