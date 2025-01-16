import useLoginValidation from "../../services/Login/LoginValidation";
import type { LoginFormType } from "../../types/Login/loginType";
import EmailInput from "./InputForm/EmailInput";
import PasswordInput from "./InputForm/PasswordInput";
import "./LoginForm.css";

export default function LoginForm({ onSubmit }: LoginFormType) {
  const {
    email,
    emailErrors,
    handleEmailChange,
    password,
    handlePasswordChange,
    passwordErrors,
  } = useLoginValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit(email, password);
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
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
      <button type="submit">Connexion</button>
    </form>
  );
}
