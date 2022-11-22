import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovieCard } from "@types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "libs/firebase-app";
import toast from "react-hot-toast";
import { RootState } from "./global-store";

export const addFollow = createAsyncThunk(
  "follow/addFollow",
  async (movie: IMovieCard, thunkAPI) => {
    try {
      const globalStore = thunkAPI.getState() as RootState;
      const { currentUser } = globalStore.auth;
      const { follows } = globalStore.follow;
      if (!currentUser) return;
      const colRef = doc(db, "users", currentUser.uid);
      const newFollows = [movie, ...follows];
      await updateDoc(colRef, { follows: newFollows });
    } catch (error: any) {
      toast.error(error?.message);
    }
  }
);

export const removeFollow = createAsyncThunk(
  "follow/removeFollow",
  async (movieId: string, thunkAPI) => {
    try {
      const globalStore = thunkAPI.getState() as RootState;
      const { currentUser } = globalStore.auth;
      const { follows } = globalStore.follow;
      if (!currentUser) return;
      const colRef = doc(db, "users", currentUser.uid);
      const newFollows = follows.filter((movie) => movie.id !== movieId);
      await updateDoc(colRef, { follows: newFollows });
    } catch (error: any) {
      toast.error(error?.message);
    }
  }
);

export interface FollowState {
  follows: IMovieCard[];
}

const initialState: FollowState = {
  follows: [],
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    // addFollow: (state, action: PayloadAction<IMovieCard>) => {
    //   // const currentUser = get().currentUser;
    //   // if (!currentUser) return;
    //   // const colRef = doc(db, "users", currentUser.uid);
    //   // const newFollows = [slug, ...get().follows];
    //   // await updateDoc(colRef, { follows: newFollows });
    //   state.follows.push(action.payload);
    // },
    // removeFollow: (state, action: PayloadAction<string>) => {
    //   const movieId = action.payload;
    //   const foundMovieIndex = state.follows.findIndex((movie) => movie.id === movieId);
    //   if (foundMovieIndex !== -1) state.follows.splice(foundMovieIndex, 1);
    // },
    setFollows: (state, action: PayloadAction<IMovieCard[]>) => {
      state.follows = action.payload;
    },
  },
});

export const { setFollows } = followSlice.actions;
export default followSlice.reducer;
