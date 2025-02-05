import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.info("Token reçu :", credentialResponse.credential);

        if (credentialResponse.credential) {
          localStorage.setItem("google_token", credentialResponse.credential);
        }

        navigate("/");
      }}
      onError={() => {
        console.info("Échec de la connexion");
      }}
    />
  );
};

export default GoogleLoginButton;
