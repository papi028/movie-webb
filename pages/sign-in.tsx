import { CustomLink } from "components/CustomLink";
import { FormGroup } from "components/FormGroup";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { PATH } from "constants/path";
import { FormEvent } from "react";

const SignIn = () => {
  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSignIn");
  };
  return (
    <div className="auth">
      <div className="auth-container">
        {null ? (
          "Null"
        ) : (
          <form onSubmit={handleSignIn}>
            <h2>Welcome to Filmlok</h2>
            <span className="auth-label">SignIn to continue</span>
            <div className="auth-main">
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="text" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" placeholder="Password" />
              </FormGroup>
              <button type="submit" className="auth-button auth-primary">
                Sign In
              </button>
              <div className="auth-other">
                <span>Or</span>
              </div>
              <button type="button" className="auth-button auth-facebook">
                <picture>
                  <img src="/icon-facebook.png" alt="Sign In with Facebook" />
                </picture>
                Sign In with Facebook
              </button>
              <button type="button" className="auth-button auth-google">
                <picture>
                  <img src="/icon-google.png" alt="Sign In with Google" />
                </picture>
                Sign In with Google
              </button>
            </div>
            <div className="already-account">
              Do not have an account? <CustomLink href={PATH.signUp}>Sign Up Here</CustomLink>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
