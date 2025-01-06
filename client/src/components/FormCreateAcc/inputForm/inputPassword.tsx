import { FormControl, FormLabel } from "@mui/material";
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
      <FormControl className="formGroup" required>
        <FormLabel htmlFor="password">
          Veuillez entrer un mot de passe
        </FormLabel>
        <StyledInput
          onChange={handlePasswordChange}
          type="password"
          name="password"
          id="password"
          placeholder="Votre mot de passe"
        />
        {error && <p className="error">{error}</p>}
      </FormControl>

      <FormControl className="formGroup" required>
        <FormLabel htmlFor="confirmedPassword">
          Veuillez confirmer votre mot de passe
        </FormLabel>
        <StyledInput
          onChange={handleConfirmPasswordChange}
          placeholder="Confirmez votre mot de passe"
          type="password"
          name="confirmedPassword"
          id="confirmedPassword"
        />

        {passwords !== isSamePasswords && (
          <p className="error">Mots de passe différents</p>
        )}
      </FormControl>
    </>
  );
}
