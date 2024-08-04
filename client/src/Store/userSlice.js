import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    userId: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
    },
  },
});

export const { setUser, setToken, setUserId, clearUser } = userSlice.actions;

export default userSlice.reducer;
