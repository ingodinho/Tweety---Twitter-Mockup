import { useState } from "react";
import { InputField } from "../../../styles/InputField";
import { ButtonBig } from "../../../styles/Buttons";
import styled from "styled-components";
import BirdLogoSrc from "../../../img/icons/Bird Logo.svg";
import { apiLink } from "../../utils/apiLink";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailValidation = () => {
  const navigator = useNavigate();
  const [inputMail, setInputMail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [inputDigitCode, setInputDigitCode] = useState("");

  const verifyEmail = async (e) => {
    e.preventDefault();
    const data = {
      email: inputMail,
      sixDigitCode: inputDigitCode,
    };
    const response = axios.put(apiLink + "/users/verify", data);
    console.log(response);
    //    IF IN ORDNUNG, Back to Home
    setSuccessMessage("Code verification completed");
    setTimeout(() => {
      navigator("/home");
    }, 1500);
    return response;
  };

  return (
    <Wrapper>
      <Header>
        <BirdLogo src={BirdLogoSrc} alt="Company Logo Bird" />
      </Header>
      <Headline>Email Validation</Headline>
      <InfoText>
        Hello my Friend. Here you can validate your Email-Adress
      </InfoText>
      <FormWrapper onSubmit={verifyEmail}>
        <InputField
          type="text"
          value={inputMail}
          onChange={(e) => setInputMail(e.target.value)}
          placeholder={"Your Email Adress"}
        />
        <InputField
          type="text"
          maxlenght={6}
          value={inputDigitCode}
          placeholder={"Your 6 digit code"}
          onChange={(e) => setInputDigitCode(e.target.value)}
        />
        <ButtonBig>Submit</ButtonBig>

        {successMessage && <ResultMessage>{successMessage}</ResultMessage>}
      </FormWrapper>
    </Wrapper>
  );
};

export default EmailValidation;

const Wrapper = styled.section`
  padding: 2rem var(--spacing-wrapper);
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  margin-bottom: 3rem;
`;

const BirdLogo = styled.img`
  width: 27px;
  height: 27px;
`;

const Headline = styled.h1`
  font-size: 3.2rem;
  margin-bottom: 2rem;
`;

const InfoText = styled.p`
  font-size: 1.6rem;
`;

const FormWrapper = styled.form`
  margin-top: 5rem;
`;

const ResultMessage = styled.p`
  margin: 3vh 0 0 0;
  text-align: center;
  font-size: 1.6rem;
  color: var(--clr-text-prm);
`;
