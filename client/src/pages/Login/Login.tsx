import { useNavigate } from "react-router-dom";
import ExternalSystemLogin from "../../components/Login/ExternalSystemLogin";
import LoginForm from "../../components/Login/LoginForm";
import PasswordForgotten from "../../components/Login/PasswordForgotten";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <LoginForm />
      <PasswordForgotten />
      <p>ou</p>
      <ExternalSystemLogin />

      {/* TODO : Modifier par le composant d'inscription quand merge sur dev */}
      <button
        type="button"
        className="subscribeBtn"
        onClick={() => {
          navigate("/");
        }}
      >
        S'inscrire
      </button>
    </>
  );
}
