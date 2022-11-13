import { FormGroup } from "components/FormGroup";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { FormEvent } from "react";
import styles from "styles/profile.module.scss";

const ProfilePage = () => {
  const handleUpdateProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleUpdateProfile");
  };
  return (
    <LayoutPrimary>
      <div className="container">
        <section className={styles.section}>
          <div className={styles.avatarBox}>
            <picture>
              <img src="https://source.unsplash.com/random" alt="" className={styles.avatar} />
            </picture>
            <h3 className={styles.username}>Nguyen Hoang Lam</h3>
            <span className={styles.email}>nguyenhoanglam@gmail.com</span>
          </div>
          <div>
            <h1>Account information</h1>
            <span>Update your account information</span>
            <form className={styles.profileForm} onSubmit={handleUpdateProfile}>
              <FormGroup>
                <Label htmlFor="fullname">Fullname</Label>
                <Input name="text" type="text" placeholder="fullname" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" placeholder="Password" />
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
