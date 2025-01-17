import { useNavigate } from "react-router-dom";
import useLoginValidation from "../../services/Login/LoginValidation";
import EmailInput from "./InputForm/EmailInput";
import PasswordInput from "./InputForm/PasswordInput";
import "./LoginForm.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    email,
    emailErrors,
    handleEmailChange,
    password,
    handlePasswordChange,
    passwordErrors,
  } = useLoginValidation();

  const handleSubmit = () => {
    navigate("/");
  };
  return (
    <form className="loginForm">
      <EmailInput
        email={email}
        handleEmailChange={handleEmailChange}
        emailErrors={emailErrors}
      />
      <PasswordInput
        password={password}
        handlePasswordChange={handlePasswordChange}
        passwordErrors={passwordErrors}
      />
      <button onClick={handleSubmit} type="submit">
        Connexion
      </button>
    </form>
  );
}
