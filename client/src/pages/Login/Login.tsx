import ExternalSystemLogin from "../../components/Login/ExternalSystemLogin";
import LoginForm from "../../components/Login/LoginForm";
import PasswordForgotten from "../../components/Login/PasswordForgotten";
import SignUp from "../../components/Login/SignUp";
import "./Login.css";

export default function Login() {
  return (
    <>
      <LoginForm />
      <PasswordForgotten />
      <p>ou</p>
      <ExternalSystemLogin />
      <SignUp />
    </>
  );
}
