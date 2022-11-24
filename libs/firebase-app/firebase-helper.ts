import { sendPasswordResetEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { auth, db } from "./firebase-config";

export const sendLinkResetPassword = async (email: string) => {
  try {
    if (!email) return;
    await sendPasswordResetEmail(auth, email);
    toast.success("Please check email!");
  } catch (error: any) {
    toast.error(error?.message);
  }
};

export const handleUpdateUser = async (
  e: FormEvent<HTMLFormElement>,
  userId: string,
  values: any
) => {
  try {
    e.preventDefault();
    if (!userId) return;
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, { ...values });
    toast.success("Update user info successfully!");
  } catch (error: any) {
    toast.error(error?.message);
  }
};

export const handleUpdateAvatar = async (
  e: ChangeEvent<HTMLInputElement>,
  userId: string,
  values: any,
  setValues: any
) => {
  try {
    const files = e.target.files;
    if (!files || !userId) return;
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + files[0].name);
    await uploadBytesResumable(storageRef, files[0]);
    const newAvatar = await getDownloadURL(storageRef);
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, { avatar: newAvatar });
    toast.success("Update avatar successfully!");
    setValues({ ...values, avatar: newAvatar });
  } catch (error) {
    toast.error("Update avatar fail!");
  }
};
