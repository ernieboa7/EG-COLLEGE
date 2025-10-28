
/*
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  student: JSON.parse(localStorage.getItem("student") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      const { token, role, student } = payload;
      state.token = token || null;
      state.role = role || "student";
      state.student = student || null;
      token ? localStorage.setItem("token", token) : localStorage.removeItem("token");
      role ? localStorage.setItem("role", role) : localStorage.removeItem("role");
      student ? localStorage.setItem("student", JSON.stringify(student)) : localStorage.removeItem("student");
    },
    logout: (state) => {
      state.token = null; state.role = null; state.student = null;
      localStorage.removeItem("token"); localStorage.removeItem("role"); localStorage.removeItem("student");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
*/

import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api"; //  Correct import

const initialState = {
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  student: JSON.parse(localStorage.getItem("student") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      const { token, role, student } = payload;
      state.token = token || null;
      state.role = role || "student";
      state.student = student || null;

      // ✅ Persist safely
      if (token) localStorage.setItem("token", token);
      else localStorage.removeItem("token");

      if (role) localStorage.setItem("role", role);
      else localStorage.removeItem("role");

      if (student)
        localStorage.setItem("student", JSON.stringify(student));
      else localStorage.removeItem("student");
    },

    logout: (state) => {
      state.token = null;
      state.role = null;
      state.student = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("student");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

/*  Proper logout helper */
export const performLogout = () => (dispatch) => {
  dispatch(logout());
  dispatch(api.util.resetApiState()); //  Clears cached queries (profile, courses, etc.)
};
