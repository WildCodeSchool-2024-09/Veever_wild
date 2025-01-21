import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import useLoginValidation from "../../services/Login/loginValidation";
import type { DecodedTokenType } from "../../types/Login/loginType";
import EmailInput from "./InputForm/EmailInput";
import PasswordInput from "./InputForm/PasswordInput";
import "./LoginForm.css";

export default function LoginForm() {
  const { email, handleEmailChange, password, handlePasswordChange } =
    useLoginValidation();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important pour envoyer et recevoir les cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Une erreur est survenue");
      }

      const data = await response.json();

      const decodedToken = jwtDecode<DecodedTokenType>(data.token);
      const userRole = decodedToken.role;

      if (userRole === "admin") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur inconnue est survenue.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <EmailInput email={email} handleEmailChange={handleEmailChange} />
      <PasswordInput
        password={password}
        handlePasswordChange={handlePasswordChange}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
