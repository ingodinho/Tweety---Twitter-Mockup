import { useState } from "react";
import { InputField } from "../../../styles/InputField";
import { ButtonBig } from "../../../styles/Buttons";
import { Headline } from "../../../styles/Headline";
import { FormWrapper } from "../Register/RegisterStyling";
import axios from "axios";
import { apiLink } from "../../utils/apiLink";
import { useNavigate } from "react-router-dom";
import BackButton from "../../shared/BackButton";
import styled from "styled-components";

const LoginForm = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const loginData = {
      email,
      password,
    };

    const response = await axios.post(apiLink + "/users/login", loginData, {
      withCredentials: true,
    });
    if (response.data.message) {
      setErrorMessage(response.data.message);
      return;
    }
    setSuccessMessage("Successfully logged in.");
    setTimeout(() => {
      navigator("/home");
      setErrorMessage("");
      setEmail("");
      setPassword("");
    }, 1500);
  };

  console.log(errorMessage);

  return (
    <>
      <BackButton path={"/"} />
      <FormWrapper>
        <Headline>Log in to your account</Headline>
        <InputField
          required
          placeholder="Your Email here"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          required
          placeholder="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonBig type="submit" onClick={handleSubmit}>
          Log In
        </ButtonBig>

        {errorMessage && <ResultMessage>{errorMessage}</ResultMessage>}

        {successMessage && <ResultMessage>{successMessage}</ResultMessage>}
      </FormWrapper>
    </>
  );
};

const ResultMessage = styled.p`
  margin: 3vh 0 0 0;
  text-align: center;
  font-size: 1.6rem;
  color: var(--clr-text-prm);
`;

export default LoginForm;
