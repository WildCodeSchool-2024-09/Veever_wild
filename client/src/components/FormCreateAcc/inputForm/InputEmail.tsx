import { FormControl, FormLabel } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { StyledInput } from "../../../services/FormCreateAcc/inputStyle";

const schema = Yup.object({
  email: Yup.string()
    .email("Veuillez entrer un e-mail valide")
    .required("L'e-mail est requis")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Veuillez entrer un e-mail valide avec un domaine correct",
    )
    .max(50, "L'e-mail ne peut pas dépasser 50 caractères"),
});

export default function InputEmail() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const handleChangeEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    try {
      await schema.validate({ email: newEmail });
      setErrors("");
    } catch (error) {
      setErrors("Veuillez entrez une adresse-mail valide");
    }
  };

  return (
    <FormControl className="formGroup" required>
      <FormLabel htmlFor="email">Votre adresse e-mail</FormLabel>
      <StyledInput
        onChange={handleChangeEmail}
        type="email"
        name="email"
        id="email"
        placeholder="Votre e-mail"
        value={email}
      />
      {errors && <p className="error">{errors}</p>}
    </FormControl>
  );
}
