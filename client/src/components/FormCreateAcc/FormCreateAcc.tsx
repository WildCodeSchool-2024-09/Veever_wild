import "./FormCreateAcc.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
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
  return (
    <>
      <section className="headerForm">
        <img className="logoForm" src="./src/assets/images/logo.svg" alt="" />
        <h1>Crée votre Compte pour devenir un Veever</h1>
      </section>
      <form action="submit" className="createForm">
        <InputFirstName />
        <InputLastName />
        <InputUsername />
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
      </form>
    </>
  );
}
