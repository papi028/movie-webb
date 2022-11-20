import { CheckLoggedIn } from "components/Authentication";
import { CustomLink } from "components/CustomLink";
import { FormGroup } from "components/FormGroup";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { PATH } from "constants/path";
import { signInWithEmailAndPassword } from "firebase/auth";
import useInputChange from "hooks/useInputChange";
import { auth } from "libs/firebase-app";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import styles from "styles/auth.module.scss";
import classNames from "utils/classNames";

const SignInPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { onChange } = useInputChange(values, setValues);
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAllInputFilled = Object.values(values).every((value) => value !== "");
    if (!isAllInputFilled) {
      toast.error("Please fill all inputs!");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Sign in successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <CheckLoggedIn>
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
                  <Input name="email" type="email" placeholder="Email" onChange={onChange} />
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
                <button type="submit" className={classNames(styles.button, styles.buttonLarge)}>
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
    </CheckLoggedIn>
  );
};

export default SignInPage;
