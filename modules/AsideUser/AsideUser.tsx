import { IconLogout } from "components/Icons";
import { ImageUpload } from "components/ImageUpload";
import { defaultAvatar } from "constants/global";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "libs/firebase-app";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { logout } from "store/auth.slice";
import { useAppDispatch, useAppSelector } from "store/global-store";
import styles from "./asideUser.module.scss";

const AsideUser = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({
    displayName: currentUser?.displayName || "",
    photoURL: currentUser?.photoURL || "",
  });
  const deleteAvatar = async () => {
    if (!currentUser) return;
    const colRef = doc(db, "users", currentUser.uid);
    await updateDoc(colRef, {
      photoURL: defaultAvatar,
    });
    setValues({ ...values, photoURL: defaultAvatar });
  };
  const handleUploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files || !files[0].name || !currentUser) return;
      const storage = getStorage();
      const storageRef = ref(storage, "images/" + files[0].name);
      await uploadBytesResumable(storageRef, files[0]);
      const newAvatar = await getDownloadURL(storageRef);
      const colRef = doc(db, "users", currentUser.uid);
      await updateDoc(colRef, { photoURL: newAvatar });
      toast.success("Update avatar successfully!");
      setValues({ ...values, photoURL: newAvatar });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.aside}>
      <ImageUpload
        name="photoURL"
        image={values.photoURL || ""}
        handleDeleteImage={deleteAvatar}
        handleUploadImage={handleUploadAvatar}
      />
      <h3 className={styles.username}>{currentUser?.displayName}</h3>
      <span className={styles.email}>{currentUser?.email}</span>
      <button onClick={handleLogout} className={styles.logout}>
        <IconLogout />
        Logout
      </button>
    </div>
  );
};

export default AsideUser;
