import { FormGroup } from "components/FormGroup";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { LayoutDashboard } from "layouts/LayoutDashboard";
import { FormEvent } from "react";
import styles from "styles/profile.module.scss";

const UserDetailsPage = () => {
  const handleUpdateUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleUpdateUser");
  };
  return (
    <LayoutDashboard title="Update user" desc="Update user information">
      <div className="container">
        <section className={styles.section}>
          <div className={styles.avatarBox}>
            <picture>
              <img src="https://source.unsplash.com/random" alt="" className={styles.avatar} />
            </picture>
            <h3 className={styles.username}>Nguyen Hoang Lam</h3>
            <span className={styles.email}>nguyenhoanglam@gmail.com</span>
          </div>
          <form onSubmit={handleUpdateUser}>
            <FormGroup>
              <Label htmlFor="fullname">Fullname</Label>
              <Input name="text" type="text" placeholder="Fullname" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input name="password" type="password" placeholder="Password" />
            </FormGroup>
            <button type="submit" className={styles.buttonSubmit}>
              Update
            </button>
          </form>
        </section>
      </div>
    </LayoutDashboard>
  );
};

export default UserDetailsPage;
