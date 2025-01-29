import "./Form.css";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import useFormData from "../../services/Form/FormData";
import useFormValidation from "../../services/Form/FormValidation";
import HeaderForm from "./HeaderForm";
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

export default function Form() {
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
  const { handleChange, formData } = useFormData();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const handleClose = () => {
    setShowSnackbar(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0 || !isSamePassword) {
      setShowSnackbar(true);
      return;
    }
  };

  return (
    <>
      <HeaderForm />
      <form onSubmit={handleSubmit} className="createForm">
        <InputUsername
          handleChange={handleChange("username")}
          value={formData.username}
        />
        <InputLastName
          handleChange={handleChange("lastname")}
          value={formData.lastname}
        />
        <InputFirstName
          handleChange={handleChange("firstname")}
          value={formData.firstname}
        />
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
        <InputGender
          handleChange={handleChange("gender")}
          value={formData.gender}
        />
        <InputDate handleChange={handleChange("date")} value={formData.date} />
        <InputPhone
          handleChange={handleChange("phone")}
          value={formData.phone}
        />
        <InputCheckContact
          handleChange={handleChange("checkContact")}
          value={formData.checkContact}
        />
        <InputCheckCGU
          handleChange={handleChange("checkCGU")}
          value={formData.checkCGU}
        />
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
