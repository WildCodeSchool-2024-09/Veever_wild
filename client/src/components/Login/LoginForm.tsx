import "./LoginForm.css";

export default function LoginForm() {
  return (
    <form className="loginForm">
      <label htmlFor="email">Email :</label>
      <input type="email" name="email" id="email" placeholder="Email" />

      <label htmlFor="password">Mot de passe :</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Mot de passe"
      />

      <button type="submit">Connexion</button>
    </form>
  );
}
