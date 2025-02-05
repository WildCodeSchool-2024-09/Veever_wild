// import { type CredentialResponse, GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";

// const GoogleLoginButton = () => {
//   const navigate = useNavigate();

//   const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
//     console.info("Token reçu :", credentialResponse.credential);

//     if (credentialResponse.credential !== undefined) {
//       localStorage.setItem("google_token", credentialResponse.credential);

//       // Après avoir enregistré le token, envoyer une requête pour vérifier le token
//       fetch("http://localhost:3310/api/checkToken", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${credentialResponse.credential}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.info("Réponse du serveur:", data);

//           // Si la réponse est correcte et valide, on navigue vers la page d'accueil
//           if (data.success) {
//             navigate("/"); // Remplace par le chemin approprié
//           } else {
//             console.error("Token invalide ou erreur serveur");
//           }
//         })
//         .catch((error) => {
//           console.error("Erreur lors de la vérification du token:", error);
//         });
//     }
//   };

//   const handleGoogleError = () => {
//     console.info("Échec de la connexion");
//   };

//   return (
//     <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
//   );
// };

// export default GoogleLoginButton;
