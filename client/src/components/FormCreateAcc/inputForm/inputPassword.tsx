import { useState } from "react";
import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";

export default function InputPassword() {
  const [passwords, setPasswords] = useState("");
  const [isSamePasswords, setIsSamePasswords] = useState("");
  const [error, setError] = useState<string | null>(null);

  const checkPassword = (password: string) => {
    if (password.length < 8) {
      setError("Le mot de passe doit comporter au moins 8 caractères.");
      return false;
    }

    if (password === password.toLowerCase()) {
      setError("Le mot de passe doit contenir au moins une majuscule.");
      return false;
    }

    setError(null);
    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswords(password);

    checkPassword(password);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const confirmedPassword = e.target.value;
    setIsSamePasswords(confirmedPassword);
  };

  return (
    <>
      <fieldset className="formGroup">
        <label htmlFor="password">Veuillez entrer un mot de passe</label>
        <StyledInput
          onChange={handlePasswordChange}
          required
          type="password"
          name="password"
          id="password"
          placeholder="Votre mot de passe"
        />
        {error && <p className="errorPassword">{error}</p>}
      </fieldset>

      <fieldset className="formGroup">
        <label htmlFor="confirmedPassword">
          Veuillez confirmer votre mot de passe
        </label>
        <StyledInput
          onChange={handleConfirmPasswordChange}
          required
          placeholder="Confirmez votre mot de passe"
          type="password"
          name="confirmedPassword"
          id="confirmedPassword"
        />

        {passwords !== isSamePasswords && (
          <p className="errorPassword">Mots de passe différents</p>
        )}
      </fieldset>
    </>
  );
}
