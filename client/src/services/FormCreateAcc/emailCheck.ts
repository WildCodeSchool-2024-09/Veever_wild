import { useState } from "react";
import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string()
    .email("Veuillez entrer un e-mail valide")
    .required("L'e-mail est requis")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Veuillez entrer un e-mail valide avec un domaine correct",
    )
    .max(50),
});

export default function useEmailCheck() {
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
  return { email, errors, handleChangeEmail };
}
