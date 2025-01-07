import { useCallback, useEffect, useState } from "react";
import type { passwordCheck } from "../../types/Password/PasswordCheck";

export function usePasswordValidation() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<passwordCheck>({});
  const [isSamePassword, setIsSamePassword] = useState(true);

  const validatePassword = useCallback((password: string) => {
    const newErrors: passwordCheck = {};

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

    return newErrors;
  }, []);

  useEffect(() => {
    setErrors(validatePassword(password));
    setIsSamePassword(password === confirmPassword);
  }, [password, confirmPassword, validatePassword]);

  const handlePasswordChange = (value: string) => setPassword(value);
  const handleConfirmPasswordChange = (value: string) =>
    setConfirmPassword(value);

  return {
    errors,
    isSamePassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
}
