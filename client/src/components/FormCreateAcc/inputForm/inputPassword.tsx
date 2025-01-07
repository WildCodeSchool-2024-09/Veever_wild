import { FormControl, FormLabel } from "@mui/material";
import { useState } from "react";
import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";
import type { passwordCheck } from "../../../types/Password/PasswordCheck";

export default function InputPassword() {
  const [passwords, setPasswords] = useState("");
  const [isSamePasswords, setIsSamePasswords] = useState("");
  const [errors, setErrors] = useState<passwordCheck>({});

  const handleChangeCheckPassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const password = e.target.value;
    setPasswords(password);

    const newErrors: passwordCheck = {};

    // Vérifie la longueur
    if (password.length < 8) {
      newErrors.length =
        "Votre mot de passe doit contenir au moins 8 caractères";
    }

    if (!/\d/.test(password)) {
      newErrors.number = "Votre mot de passe doit contenir au moins un chiffre";
    }

    if (password === password.toLowerCase()) {
      newErrors.maj = "Votre mot de passe doit contenir au moins une majuscule";
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.specialChar =
        "Votre mot de passe doit contenir au moins un caractère spécial";
    }

    setErrors(newErrors);
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
          onChange={handleChangeCheckPassword}
          type="password"
          name="password"
          id="password"
          placeholder="Votre mot de passe"
        />
        {errors && (
          <ul className="errors">
            {errors.length && <li className="error">{errors.length}</li>}
            {errors.maj && <li className="error">{errors.maj}</li>}
            {errors.number && <li className="error">{errors.number}</li>}
            {errors.specialChar && (
              <li className="error">{errors.specialChar}</li>
            )}
          </ul>
        )}
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
          <p className="errors">Mots de passe différents</p>
        )}
      </FormControl>
    </>
  );
}
