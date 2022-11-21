import { ProtectedRoute } from "components/Authentication";
import { FormGroup } from "components/FormGroup";
import { IconLogout } from "components/Icons";
import { ImageUpload } from "components/ImageUpload";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { defaultAvatar } from "constants/global";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import useInputChange from "hooks/useInputChange";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { db } from "libs/firebase-app";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { logout } from "store/auth.slice";
import { useAppDispatch, useAppSelector } from "store/global-store";
import styles from "styles/profile.module.scss";

const ProfilePage = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({
    fullname: "",
    avatar: "",
  });
  const { onChange } = useInputChange(values, setValues);
  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!currentUser || !currentUser.uid) return;
      const colRef = doc(db, "users", currentUser.uid);
      await updateDoc(colRef, values);
      toast.success("Update profile successfully!");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const deleteAvatar = async () => {
    if (!currentUser) return;
    const colRef = doc(db, "users", currentUser.uid);
    await updateDoc(colRef, {
      avatar: defaultAvatar,
    });
  };
  const handleUploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files || !currentUser?.uid) return;
      const storage = getStorage();
      const storageRef = ref(storage, "images/" + files[0].name);
      await uploadBytesResumable(storageRef, files[0]);
      const newAvatar = await getDownloadURL(storageRef);
      const colRef = doc(db, "users", currentUser?.uid);
      await updateDoc(colRef, { avatar: newAvatar });
      toast.success("Update avatar successfully!");
      setValues({ ...values, avatar: newAvatar });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    async function fetchData() {
      if (!currentUser || !currentUser.uid) return;
      const colRef = doc(db, "users", currentUser.uid);
      const docData = await getDoc(colRef);
      setValues({ ...values, ...docData.data() });
    }
    fetchData();
  }, [currentUser]);
  return (
    <ProtectedRoute>
      <LayoutPrimary>
        <div className="container">
          <section className={styles.section}>
            <div className={styles.avatarBox}>
              <ImageUpload
                name="avatar"
                handleDeleteImage={deleteAvatar}
                handleUploadImage={handleUploadAvatar}
                image={values.avatar}
              ></ImageUpload>
              <h3 className={styles.username}>{currentUser?.fullname}</h3>
              <span className={styles.email}>{currentUser?.email}</span>
              <button onClick={handleLogout} className={styles.logout}>
                <IconLogout />
                Logout
              </button>
            </div>
            <div>
              <h1>Account information</h1>
              <span className={styles.desc}>Update your account information</span>
              <form className={styles.profileForm} onSubmit={handleUpdateProfile}>
                <FormGroup>
                  <Label htmlFor="fullname">Fullname</Label>
                  <Input
                    name="fullname"
                    type="text"
                    value={values.fullname}
                    placeholder="Fullname"
                    onChange={onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={onChange}
                  />
                </FormGroup>
                <button type="submit" className={styles.buttonSubmit}>
                  Update
                </button>
              </form>
            </div>
          </section>
        </div>
      </LayoutPrimary>
    </ProtectedRoute>
  );
};

export default ProfilePage;
