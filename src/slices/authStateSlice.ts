import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthState } from "types";

const initialAuthState: AuthState = {
  user: undefined,
  signedIn: false
};

const authStateSlice = createSlice({
  name: "authState",
  initialState: initialAuthState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<any>) {
      const user = action.payload;
      state.user = user;
      if (user) {
        state.signedIn = true;
      } else {
        state.signedIn = false;
      }
    }
  }
});

export const { setUser } = authStateSlice.actions;

export default authStateSlice.reducer;
