import { CustomLink } from "components/CustomLink";
import { FormGroup } from "components/FormGroup";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { PATH } from "constants/path";
import { FormEvent } from "react";
import styles from "styles/auth.module.scss";
import classNames from "utils/classNames";

const SignUpPage = () => {
  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSignUp");
  };
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        {null ? (
          "Null"
        ) : (
          <form onSubmit={handleSignUp}>
            <h1 className={styles.heading}>Welcome to Filmlok</h1>
            <span className={styles.label}>SignUp to continue</span>
            <div className={styles.main}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="text" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" placeholder="Min 8 characters" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="repeat-password">Re-password</Label>
                <Input name="repeat-password" type="password" placeholder="Min 8 characters" />
              </FormGroup>
              <button type="button" className={classNames(styles.button, styles.buttonLarge)}>
                Sign Up
              </button>
            </div>
            <div className={styles.alreadyAccount}>
              Have an account? <CustomLink href={PATH.signIn}>Sign In Here</CustomLink>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
