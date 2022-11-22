import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "libs/firebase-app";
import React, { useEffect } from "react";
import { setCurrentUser } from "store/auth.slice";
import { setFollows } from "store/follow.slice";
import { useAppDispatch } from "store/global-store";

function Authentication({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch(setCurrentUser(null));
        return;
      }
      const docRef = query(collection(db, "users"), where("email", "==", user.email));
      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach(async (document) => {
          dispatch(setCurrentUser({ ...user, ...document.data() }));
          dispatch(setFollows(document.data().follows));
        });
      });
    });
    return () => unsubscribe();
  }, []);
  return <>{children}</>;
}

export default Authentication;
