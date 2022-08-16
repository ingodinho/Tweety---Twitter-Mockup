import { useState } from "react";
import { InputField } from "../../../styles/InputField";
import { ButtonBig } from "../../../styles/Buttons";
import { Headline } from "../../../styles/Headline";
import { FormWrapper } from "../Register/RegisterStyling";
import axios from "axios";
import {apiLink} from "../../utils/apiLink";
// import { apiUrl } from "INSERT_APIURL_FILE_HERE";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const loginData = {
        email,
        password
    }

    const response = await axios.post(apiLink + '/users/login', loginData);
    console.log(response);

    // fetch(apiUrl + "/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);

    //     if (result.message) {
    //       return setErrorMessage(result.message);
    //     }

    //     setErrorMessage("");
    //     setEmail("");
    //     setPassword("");
    //   });
  };

  return (
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

      {/* <FeedbackMessage type="error" message={errorMessage} /> */}
    </FormWrapper>
  );
};

export default LoginForm;
