import "./FormCreateAcc.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePasswordValidation } from "../../services/FormCreateAcc/passwordCheck";
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
  const { errors, isSamePassword } = usePasswordValidation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0 || !isSamePassword) {
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
      <form onSubmit={handleSumbit} className="createForm">
        <InputUsername />
        <InputLastName />
        <InputFirstName />
        <InputEmail />
        <InputPassword />
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
