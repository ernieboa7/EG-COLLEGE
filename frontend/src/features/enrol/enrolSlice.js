import { createSlice } from "@reduxjs/toolkit";
const enrolSlice = createSlice({
  name: "enrol",
  initialState: { lastEnrolledId: null },
  reducers: { setLastEnrolledId: (s, a) => { s.lastEnrolledId = a.payload; } },
});
export const { setLastEnrolledId } = enrolSlice.actions;
export default enrolSlice.reducer;
