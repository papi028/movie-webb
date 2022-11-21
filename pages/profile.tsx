import { FormGroup } from "components/FormGroup";
import { ImageUpload } from "components/ImageUpload";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { db, handleUpdateUser } from "libs/firebase-app";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "store/global-store";
import styles from "styles/profile.module.scss";

const ProfilePage = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [values, setValues] = useState({
    fullname: "",
    avatar: "",
  });
  const { onChange } = useInputChange(values, setValues);
  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!currentUser || !currentUser.uid) return;
      const colRef = doc(db, "users", currentUser?.uid);
      await updateDoc(colRef, values);
      toast.success("Cập nhật thông tin thành công!");
    } catch (error: any) {
      toast.error(error?.message);
    }
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
    <LayoutPrimary>
      <div className="container">
        <section className={styles.section}>
          <div className={styles.avatarBox}>
            <ImageUpload
              name="avatar"
              className="!rounded-full h-full"
              handleDeleteImage={() => console.log("delete")}
              progress={0}
              image="https://source.unsplash.com/random"
            ></ImageUpload>
            <h3 className={styles.username}>{currentUser?.fullname}</h3>
            <span className={styles.email}>{currentUser?.email}</span>
          </div>
          <div>
            <h1>Account information</h1>
            <span>Update your account information</span>
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
                <Input name="password" type="password" placeholder="Password" onChange={onChange} />
              </FormGroup>
              <button type="submit" className={styles.buttonSubmit}>
                Update
              </button>
            </form>
          </div>
        </section>
      </div>
    </LayoutPrimary>
  );
};

export default ProfilePage;
