import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import ExternalSystemLogin from "../../components/Login/ExternalSystemLogin";
import LoginForm from "../../components/Login/LoginForm";
import PasswordForgotten from "../../components/Login/PasswordForgotten";
import SignUp from "../../components/Login/SignUp";
import "./Login.css";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      await response.json();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur inconnue est survenue.");
      }
    }
  };
  return (
    <main className="loginMain">
      <img src={logo} alt="" />
      <h2>Connexion</h2>
      <p>Connectez-vous pour accéder à Veever</p>
      {errorMessage && <p>{errorMessage}</p>}
      <LoginForm onSubmit={handleLogin} />
      <PasswordForgotten />
      <p>ou</p>
      <ExternalSystemLogin />
      <SignUp />
    </main>
  );
}
