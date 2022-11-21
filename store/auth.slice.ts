import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentUser } from "@types";
import { signOut } from "firebase/auth";
import { auth } from "libs/firebase-app";

export interface AuthState {
  currentUser: ICurrentUser | null;
}

const initialState: AuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<ICurrentUser | null>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      signOut(auth);
    },
  },
});

export const { setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
