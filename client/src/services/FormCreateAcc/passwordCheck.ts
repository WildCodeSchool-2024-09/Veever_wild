import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function usePasswordValidation() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const validatePassword = useCallback((password: string) => {
    const newErrors: Record<string, string> = {};

    if (password.length < 12) {
      newErrors.length =
        "Votre mot de passe doit contenir au moins 12 caractères";
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

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors(validatePassword(value));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setIsSamePassword(value === password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (Object.keys(errors).length > 0 || !isSamePassword) {
      e.preventDefault();
      setShowSnackbar(true);
      console.error(errors);
      return;
    }
    navigate("/");
  };

  const handleClose = () => {
    setShowSnackbar(false);
  };

  return {
    password,
    errors,
    confirmPassword,
    showSnackbar,
    isSamePassword,
    handleClose,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
}
