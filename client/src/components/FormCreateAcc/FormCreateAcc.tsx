import "./FormCreateAcc.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../../services/FormCreateAcc/FormValidation";
import InputCheckCGU from "./inputForm/InputCheckCGU";
import InputDate from "./inputForm/InputDate";
import InputEmail from "./inputForm/InputEmail";
import InputFirstName from "./inputForm/InputFirstName";
import InputGender from "./inputForm/InputGender";
import InputPhone from "./inputForm/InputPhone";
import InputCheckContact from "./inputForm/inputCheckContact";
import InputLastName from "./inputForm/inputLastName";
import InputPassword from "./inputForm/inputPassword";
import InputUsername from "./inputForm/inputUsername";

export default function FormCreateAcc() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const {
    email,
    password,
    errors,
    confirmPassword,
    isSamePassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleEmailCheckChange,
  } = useFormValidation();

  const handleSubmit = (e: React.FormEvent) => {
    if (Object.keys(errors).length > 0 || !isSamePassword) {
      e.preventDefault();
      setShowSnackbar(true);
      return;
    }
    navigate("/");
  };

  const handleClose = () => {
    setShowSnackbar(false);
  };
  return (
    <>
      <section className="headerForm">
        <img className="logoForm" src="./src/assets/images/logo.svg" alt="" />
        <h1>Crée votre Compte pour devenir un Veever</h1>
      </section>
      <form onSubmit={handleSubmit} className="createForm">
        <InputUsername />
        <InputLastName />
        <InputFirstName />
        <InputEmail
          handleEmailCheckChange={handleEmailCheckChange}
          email={email}
          errors={errors}
        />
        <InputPassword
          password={password}
          confirmPassword={confirmPassword}
          errors={errors}
          isSamePassword={isSamePassword}
          handlePasswordChange={handlePasswordChange}
          handleConfirmPasswordChange={handleConfirmPasswordChange}
        />
        <InputGender />
        <InputDate />
        <InputPhone />
        <InputCheckContact />
        <InputCheckCGU />
        <Button className="btnAcceptForm" type="submit" variant="contained">
          Crée mon compte
        </Button>
        {showSnackbar && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={showSnackbar}
            onClose={handleClose}
            transitionDuration={700}
            message="Vous avez oublié quelques chose.."
          />
        )}
      </form>
    </>
  );
}
