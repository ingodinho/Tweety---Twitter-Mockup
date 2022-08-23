import { useState } from "react";
import {
  FormWrapper,
  Disclaimer,
  ResultMessage,
  InputDob,
} from "./RegisterStyling";
import { InputField } from "../../../styles/InputField";
import { ButtonBig } from "../../../styles/Buttons";
import { Headline } from "../../../styles/Headline";
import axios from "axios";
import { apiLink } from "../../utils/apiLink";
import { useNavigate } from "react-router-dom";
import BackButton from "../../shared/BackButton";

const RegisterForm = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigator = useNavigate();

  const passwordValition =
    /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!@#\][:()"`;+\-'|_?,.</\\>=$%}{^&*~]).{8,}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !username || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!password.match(passwordValition)) {
      setErrorMessage(
        "Password must contain at least 8 characters.\nMust contain at least 1 character.\nMust contain at least 1 digit.\nMust contain at least 1 special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password confirmation doesn't match.");
      return;
    }

    const userData = {
      username,
      firstName: firstname,
      lastName: lastname,
      email,
      dob: birthday,
      password,
      
        const response = await axios.post(apiLink + '/users/register', userData);
        if (response.data.message) {
            return setErrorMessage(response.data.message);
        }

        setErrorMessage("");
        setSuccessMessage("Your account was created, please login.");
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");

        navigator('/validation');
        
    };

    const response = await axios.post(apiLink + "/users/register", userData);
    if (response.data.message) {
      return setErrorMessage(response.data.message);
    }

    setErrorMessage("");
    setSuccessMessage(
      "Your account was created, please verify your email address."
    );
    setTimeout(() => {
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      navigator("/validation");
    }, 1500);
  };

  return (
    <>
      <BackButton path={"/"} />
      <FormWrapper>
        <Headline>Create your account</Headline>
        <InputField
          required
          placeholder="Firstname"
          id="firstname"
          autoFocus
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <InputField
          required
          placeholder="Lastname"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <InputField
          required
          placeholder="Enter Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          required
          placeholder="Your Email here"
          id="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputDob
          required
          placeholder="Your Birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          type={"date"}
        />
        <InputField
          required
          placeholder="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          required
          placeholder="Confirm Password"
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {errorMessage && <ResultMessage>{errorMessage}</ResultMessage>}

        {successMessage && <ResultMessage>{successMessage}</ResultMessage>}

        <Disclaimer>
          By signing up, you agree to our Terms, Privacy Policy and Cookie Use.
          Tweety may use your contact information, including your email address
          and phone number for purposes outlined in our Privacy Policy.
        </Disclaimer>
        <ButtonBig type="submit" onClick={handleSubmit}>
          Register
        </ButtonBig>
      </FormWrapper>
    </>
  );
};

export default RegisterForm;
