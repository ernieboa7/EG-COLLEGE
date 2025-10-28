/*

import { createSlice } from "@reduxjs/toolkit";
const paymentSlice = createSlice({
  name: "payments",
  initialState: { checkoutLoading: false },
  reducers: { setCheckoutLoading: (s, a) => { s.checkoutLoading = a.payload; } },
});
export const { setCheckoutLoading } = paymentSlice.actions;
export default paymentSlice.reducer;
*/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkoutLoading: false,
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setCheckoutLoading: (state, action) => {
      state.checkoutLoading = action.payload;
    },
  },
});

export const { setCheckoutLoading } = paymentSlice.actions;
export default paymentSlice.reducer;
