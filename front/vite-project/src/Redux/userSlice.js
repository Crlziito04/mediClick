import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  userAppointments: [],
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      //*Setear estado
      state.user = { ...action.payload };
    },
    setAppointments: (state, action) => {
      state.userAppointments = action.payload;
    },
  },
});

export const { userLogin, setAppointments } = userSlice.actions;
export default userSlice.reducer;
