import { CustomLink } from "components/CustomLink";
import { FormGroup } from "components/FormGroup";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { PATH } from "constants/path";
import { FormEvent } from "react";
import styles from "styles/auth.module.scss";
import classNames from "utils/classNames";

const SignInPage = () => {
  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSignIn");
  };
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        {null ? (
          "Null"
        ) : (
          <form onSubmit={handleSignIn}>
            <h1 className={styles.heading}>Welcome to Netfilm</h1>
            <span className={styles.label}>SignIn to continue</span>
            <div className={styles.main}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="text" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" placeholder="Password" />
              </FormGroup>
              <button type="button" className={classNames(styles.button, styles.buttonLarge)}>
                Sign In
              </button>
            </div>
            <div className={styles.alreadyAccount}>
              Do not have an account? <CustomLink href={PATH.signUp}>Sign Up Here</CustomLink>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
